<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCandidatesTable extends Migration
{
    public function up()
    {
        Schema::create('candidates', function (Blueprint $table) {
            $table->id();
            $table->foreignId('position_id')->constrained()->onDelete('cascade'); // Foreign key to 'positions' table
            $table->foreignId('election_id')->constrained()->onDelete('cascade'); // Foreign key to 'elections' table
            $table->string('name');
            $table->text('description')->nullable(); // Optional field for candidate info
            $table->string('photo')->nullable(); // Path to candidate's photo
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('candidates');
    }
}
