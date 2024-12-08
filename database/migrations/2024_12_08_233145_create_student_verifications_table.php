<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStudentVerificationsTable extends Migration
{
    public function up()
    {
        Schema::create('student_verifications', function (Blueprint $table) {
            $table->id();
            $table->string('school_id');
            $table->string('name');
            $table->string('department');
            $table->string('password'); // Store hashed passwords
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('student_verifications');
    }
}
