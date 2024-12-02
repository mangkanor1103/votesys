<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Candidate extends Model
{
    use HasFactory;

    // Fillable attributes
    protected $fillable = ['name', 'position_id', 'photo'];

    // Relationship: A candidate belongs to one position
    public function position()
    {
        return $this->belongsTo(Position::class);
    }
}
