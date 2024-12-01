<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateVoterCodesTable extends Migration
{
    public function up()
    {
        Schema::create('voter_codes', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('election_id');
            $table->string('voter_code')->unique();
            $table->timestamps();

            $table->foreign('election_id')->references('id')->on('elections')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('voter_codes');
    }
}
