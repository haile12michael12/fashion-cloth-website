<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class LookBook extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'image_path',
        'user_id',
        'is_public'
    ];

    protected $appends = [
        'image_url'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function items()
    {
        return $this->hasMany(LookBookItem::class);
    }

    public function getImageUrlAttribute()
    {
        return Storage::url($this->image_path);
    }
}