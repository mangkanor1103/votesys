<?php

namespace Database\Seeders;

use App\Models\Candidate;
use Illuminate\Database\Seeder;

class CandidateSeeder extends Seeder
{
    public function run()
    {
        Candidate::create([
            'position_id' => 1, // Replace with an actual position ID
            'name' => 'John Doe',
            'party' => 'Democratic Party',
            'photo' => 'path/to/photo.jpg',
        ]);
    }
}
