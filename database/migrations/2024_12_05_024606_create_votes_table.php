<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateVotesTable extends Migration
{
    public function up()
    {
        Schema::create('votes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('voter_id')->constrained('voters')->onDelete('cascade'); // Foreign key for the voter
            $table->foreignId('election_id')->constrained('elections')->onDelete('cascade'); // Foreign key for the election
            $table->foreignId('position_id')->constrained('positions')->onDelete('cascade'); // Foreign key for the position
            $table->foreignId('candidate_id')->nullable()->constrained('candidates')->onDelete('set null'); // Foreign key for the candidate
            $table->enum('status', ['voted', 'abstained'])->default('voted'); // Whether the voter voted or abstained
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('votes');
    }
}
