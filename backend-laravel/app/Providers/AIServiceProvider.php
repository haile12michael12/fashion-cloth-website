<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Services\OpenAIService;
use App\Services\ReplicateService;
use App\Services\HuggingFaceService;

class AIServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->singleton(OpenAIService::class, function ($app) {
            return new OpenAIService();
        });

        $this->app->singleton(ReplicateService::class, function ($app) {
            return new ReplicateService();
        });

        $this->app->singleton(HuggingFaceService::class, function ($app) {
            return new HuggingFaceService();
        });
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}