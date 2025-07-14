<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProjectEmployeesTable extends Migration
{
    public function up()
    {
        Schema::create('project_employees', function (Blueprint $table) {
            $table->uuid('project_id');
            $table->uuid('user_id');

            $table->primary(['project_id', 'user_id']);

            $table->foreign('project_id')->references('id')->on('projects');
            $table->foreign('user_id')->references('id')->on('users');
        });
    }

    public function down()
    {
        Schema::dropIfExists('project_employees');
    }
}
