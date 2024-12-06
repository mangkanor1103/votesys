<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Position extends Model
{
    use HasFactory; // Move this to the top

    // Fillable attributes
    protected $fillable = ['name', 'election_id', 'max_votes'];

    // Relationship: A position belongs to one election
    public function election()
    {
        return $this->belongsTo(Election::class);
    }

    // Relationship: A position has many candidates
    public function candidates()
    {
        return $this->hasMany(Candidate::class);
    }
    public function voter()
    {
        return $this->belongsTo(Voter::class);
    }
    public function vote()
    {
        return $this->belongsTo(Voter::class);
    }
}
