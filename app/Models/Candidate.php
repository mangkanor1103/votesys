<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Candidate extends Model
{
    use HasFactory;

    protected $fillable = [
        'position_id',
        'name',
        'party',
        'photo',
    ];

    /**
     * Get the position that the candidate belongs to.
     */
    public function position()
    {
        return $this->belongsTo(Position::class);
    }
    public function election()
    {
        return $this->belongsTo(Election::class);
    }
}
