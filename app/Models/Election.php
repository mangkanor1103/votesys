<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Election extends Model
{
    // In Election.php Model
protected $fillable = [
    'title',
    'description',
    'start_date',
    'end_date',
    'is_active',
    'election_code', // Add the election_code here
];

}
