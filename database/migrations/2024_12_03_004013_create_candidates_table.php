<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCandidatesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('candidates', function (Blueprint $table) {
            $table->id(); // Primary key
            $table->foreignId('position_id')->constrained()->onDelete('cascade'); // Foreign key referencing the 'positions' table
            $table->string('name'); // Candidate name
            $table->string('party'); // Political party
            $table->string('photo')->nullable(); // Path to candidate's photo (nullable)
            $table->timestamps(); // Created at and updated at timestamps
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('candidates');
    }
}
