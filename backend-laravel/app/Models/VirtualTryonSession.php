<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VirtualTryonSession extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'input_image_path',
        'result_image_path',
        'picture_id',
        'metadata',
        'is_completed'
    ];

    protected $casts = [
        'metadata' => 'array',
        'is_completed' => 'boolean'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function picture()
    {
        return $this->belongsTo(Picture::class);
    }
}