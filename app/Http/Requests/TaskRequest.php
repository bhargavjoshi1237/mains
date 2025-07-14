<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;

class TaskRequest extends FormRequest
{
    public function rules()
    {
        if ($this->has('tasks')) {
            return $this->batchRules();
        }
        return $this->singleTaskRules();
    }

    private function singleTaskRules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'required|string',
            'assigned_to' => 'required|uuid|exists:users,id',
            'project_id' => 'required|uuid|exists:projects,id',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
        ];
    }

    private function batchRules(): array
    {
        return [
            'tasks' => 'required|array',
            'tasks.*.id' => 'nullable|uuid|exists:tasks,id',
            'tasks.*.name' => 'required|string|max:255',
            'tasks.*.description' => 'nullable|string',
            'tasks.*.status' => 'required|string',
            'tasks.*.assigned_to' => 'required|uuid|exists:users,id',
            'tasks.*.project_id' => 'required|uuid|exists:projects,id',
            'tasks.*.start_date' => 'nullable|date',
            'tasks.*.end_date' => 'nullable|date|after_or_equal:tasks.*.start_date',
            'deletes' => 'nullable|array',
            'deletes.*' => 'uuid|exists:tasks,id',
        ];
    }

    public function getUpdatableFields(): array
    {
        $fields = $this->only([
            'name',
            'description',
            'status',
            'assigned_to',
            'project_id',
            'start_date',
            'end_date',
        ]);
        $fields['updated_by'] = Auth::id();
        return $fields;
    }

    public function validated($key = null, $default = null)
    {
        $data = parent::validated($key, $default);
        if ($this->isMethod('post') && !$this->has('tasks')) {
            $data['id'] = (string) Str::uuid();
            $data['created_by'] = Auth::id();
            $data['updated_by'] = Auth::id();
        }

        return $data;
    }

    public function validateForCreate(array $data): array
    {
        $validated = validator($data, $this->singleTaskRules())->validate();
        $validated['id'] = (string) Str::uuid();
        $validated['created_by'] = Auth::id();
        $validated['updated_by'] = Auth::id();
        return $validated;
    }

    public function validateForUpdate(array $data): array
    {
        $allowedFields = [
            'name',
            'description',
            'status',
            'assigned_to',
            'project_id',
            'start_date',
            'end_date',
        ];
        $rulesToValidate = array_intersect_key($this->singleTaskRules(), $data);
        $validated = validator($data, $rulesToValidate)->validate();
        $fields = array_intersect_key($validated, array_flip($allowedFields));
        $fields['updated_by'] = Auth::id();
        return $fields;
    }

    public function validateForBatch(array $data): array
    {
        $isUpdate = !empty($data['id']);
        if ($isUpdate) {
            return $this->validateForUpdate($data);
        } else {
            return $this->validateForCreate($data);
        }
    }
}
