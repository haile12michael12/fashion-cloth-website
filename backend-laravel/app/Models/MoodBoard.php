<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MoodBoard extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'layout_data',
        'user_id',
        'is_public',
        'share_token'
    ];

    protected $casts = [
        'layout_data' => 'array'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}