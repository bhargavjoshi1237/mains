<?php

namespace App\Repositories;

use App\Models\Activity; // Import the specific model
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ActivityRepository extends BaseRepository
{
    /**
     * Create a new repository instance.
     */
    public function __construct(Activity $model) // Accept the specific model
    {
        parent::__construct($model); // Pass it to the parent constructor
    }

    public static function log($type, $action, $entity_id, $entity_name = null)
    {
        DB::table('activities')->insert([
            'type' => $type,
            'action' => $action,
            'entity_id' => $entity_id,
            'entity_name' => $entity_name,
            'performed_by' => Auth::id(),
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
