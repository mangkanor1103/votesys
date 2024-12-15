<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('photos', function (Blueprint $table) {
            $table->id();
            $table->string('photo_path');
            $table->timestamps(); // Automatically adds created_at and updated_at fields
        });
    }

    public function down()
    {
        Schema::dropIfExists('photos');
    }

};
