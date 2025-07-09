<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('activities', function (Blueprint $table) {
            $table->id();
            $table->string('type'); // 'task', 'project', 'user'
            $table->string('action'); // 'created', 'updated'
            $table->uuid('entity_id'); // id of the entity (task/project/user)
            $table->string('entity_name')->nullable(); // name of the entity (optional)
            $table->uuid('performed_by')->nullable(); // user who performed the action (optional)
            $table->timestamps();
            // No foreign keys as per your instruction
        });
    }

    public function down()
    {
        Schema::dropIfExists('activities');
    }
};