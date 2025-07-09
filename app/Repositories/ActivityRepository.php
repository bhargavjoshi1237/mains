<?php

namespace App\Repositories;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ActivityRepository
{
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
