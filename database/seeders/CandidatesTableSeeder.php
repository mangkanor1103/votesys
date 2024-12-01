<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CandidatesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('candidates')->insert([
            [
                'position_id' => 1, // Ensure this position_id exists in the 'positions' table
                'election_id' => 1, // Ensure this election_id exists in the 'elections' table
                'name' => 'John Doe',
                'description' => 'A visionary leader with innovative ideas.',
                'photo' => 'uploads/candidates/john_doe.jpg', // Example photo path
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'position_id' => 1, // Ensure this position_id exists in the 'positions' table
                'election_id' => 1, // Ensure this election_id exists in the 'elections' table
                'name' => 'Jane Smith',
                'description' => 'An experienced candidate focused on progress.',
                'photo' => 'uploads/candidates/jane_smith.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'position_id' => 2, // Ensure this position_id exists in the 'positions' table
                'election_id' => 1, // Ensure this election_id exists in the 'elections' table
                'name' => 'Alex Brown',
                'description' => 'A passionate candidate dedicated to community service.',
                'photo' => 'uploads/candidates/alex_brown.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
