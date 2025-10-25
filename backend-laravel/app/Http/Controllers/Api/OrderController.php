<?php

namespace App\Http\Controllers\Api;

use ErrorException;
use App\Models\User;
use App\Models\Order;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;

class OrderController extends Controller
{
    /**
     * Store new order
     */
    public function store(Request $request) {
        $data = [];
        $user = User::findOrFail($request->user_id);

        foreach ($request->pictures as $picture) {
            $data['user_id'] = $user->id;
            $data['picture_id'] = $picture['id'];
            $data['total'] = $this->calculateOrderTotal($request->pictures, $savingForDatabase = true);

            //save the data
            Order::create($data);
        }
        //return the response
        return response()->json([
            'user' => UserResource::make($request->user())
        ]);
    }

     /** Pay order via stripe */
     public function payByStripe(Request $request){
        // TODO: Install stripe library with "composer require stripe/stripe-php"
        // TODO: Uncomment the following lines and add use statements for Stripe\Stripe and Stripe\PaymentIntent
        // Stripe::setApiKey(env('STRIPE_SECRET'));
        // try {
        //     // Create a PaymentIntent with amount and currency
        //     $paymentIntent = \Stripe\PaymentIntent::create([
        //         'amount' => $this->calculateOrderTotal($request->cartItems, $savingForDatabase = false),
        //         'currency' => 'usd',
        //         'description' => 'React Stock Images',
        //         'setup_future_usage' => 'on_session'
        //     ]);
        //     
        //     $output = [
        //         'clientSecret' => $paymentIntent->client_secret,
        //     ];
        //     return response()->json($output);
        //     
        // } catch (ErrorException $e) {
        //     return response()->json(['error' => $e->getMessage()]);
        // }
        
        // Temporary response until Stripe is properly implemented
        return response()->json(['error' => 'Stripe payment not implemented yet']);
    }

    /**
     * Calculate the total amount
     */
    public function calculateOrderTotal($pictures, $savingForDatabase)
    {
        $total = 0;
        foreach($pictures as $picture) {
            $total += $picture['price'];
        }
        return $savingForDatabase ? $total : $total * 100;
    }
}