<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('votes', function (Blueprint $table) {
            $table->unsignedBigInteger('candidate_id')->nullable()->change(); // Allow NULL for candidate_id
        });
    }

    public function down(): void
    {
        Schema::table('votes', function (Blueprint $table) {
            $table->unsignedBigInteger('candidate_id')->nullable(false)->change(); // Revert if needed
        });
    }
};
