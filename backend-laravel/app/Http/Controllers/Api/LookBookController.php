<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\LookBook;
use App\Models\LookBookItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Response;

class LookBookController extends Controller
{
    /**
     * Create a new look book
     */
    public function create(Request $request): JsonResponse
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'required|image|max:5120', // 5MB max
            'is_public' => 'boolean'
        ]);

        try {
            // Store the uploaded image
            $imagePath = $request->file('image')->store('look-books', 'public');
            
            // Create the look book
            $lookBook = LookBook::create([
                'title' => $request->title,
                'description' => $request->description,
                'image_path' => $imagePath,
                'user_id' => Auth::id(),
                'is_public' => $request->is_public ?? true
            ]);
            
            return Response::json([
                'message' => 'Look book created successfully',
                'data' => $lookBook
            ]);
        } catch (\Exception $e) {
            return Response::json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Add items to a look book
     */
    public function addItems(Request $request, $id): JsonResponse
    {
        $request->validate([
            'items' => 'required|array',
            'items.*.picture_id' => 'required|exists:pictures,id',
            'items.*.x_position' => 'required|integer',
            'items.*.y_position' => 'required|integer'
        ]);

        try {
            $lookBook = LookBook::findOrFail($id);
            
            // Check if the user owns this look book
            if ($lookBook->user_id !== Auth::id()) {
                return Response::json(['error' => 'Unauthorized'], 403);
            }
            
            // Add items to the look book
            foreach ($request->items as $item) {
                LookBookItem::create([
                    'look_book_id' => $lookBook->id,
                    'picture_id' => $item['picture_id'],
                    'x_position' => $item['x_position'],
                    'y_position' => $item['y_position']
                ]);
            }
            
            return Response::json([
                'message' => 'Items added to look book successfully',
                'data' => $lookBook->load('items')
            ]);
        } catch (\Exception $e) {
            return Response::json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Get a look book
     */
    public function show($id): JsonResponse
    {
        try {
            $lookBook = LookBook::with('items.picture', 'user')->findOrFail($id);
            
            // Check if the look book is public or owned by the user
            if (!$lookBook->is_public && $lookBook->user_id !== Auth::id()) {
                return Response::json(['error' => 'Unauthorized'], 403);
            }
            
            return Response::json([
                'message' => 'Look book retrieved successfully',
                'data' => $lookBook
            ]);
        } catch (\Exception $e) {
            return Response::json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * List look books
     */
    public function index(Request $request): JsonResponse
    {
        try {
            $lookBooks = LookBook::with('user')
                ->when(!$request->user()->is_admin, function ($query) {
                    // Non-admin users only see public look books or their own
                    $query->where('is_public', true)
                          ->orWhere('user_id', Auth::id());
                })
                ->latest()
                ->paginate(12);
            
            return Response::json([
                'message' => 'Look books retrieved successfully',
                'data' => $lookBooks
            ]);
        } catch (\Exception $e) {
            return Response::json(['error' => $e->getMessage()], 500);
        }
    }
}