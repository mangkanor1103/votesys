<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
// database/migrations/xxxx_xx_xx_create_candidates_table.php
public function up()
{
    Schema::create('candidates', function (Blueprint $table) {
        $table->id();
        $table->foreignId('election_id')->constrained()->onDelete('cascade');
        $table->foreignId('position_id')->constrained()->onDelete('cascade');
        $table->string('name');
        $table->text('platform');
        $table->timestamps();
    });
}


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('candidates');
    }
};
