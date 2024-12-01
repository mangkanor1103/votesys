<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Position extends Model
{
    public function candidates()
{
    return $this->hasMany(Candidate::class);
}

    use HasFactory;

    protected $fillable = ['name', 'election_id', 'max_votes'];

    public function election()
    {
        return $this->belongsTo(Election::class);
    }
}
