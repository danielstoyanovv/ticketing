export interface RedisInterface {
    /**
     * Get Redis Client
     * @return {object}
     */
    createClient(): RedisClient<RedisDefaultModules & RedisModules, RedisFunctions, RedisScripts, 2 | 3, TypeMapping> & WithCommands<2 | 3, TypeMapping> & WithModules<RedisDefaultModules & RedisModules, 2 | 3, TypeMapping> & WithFunctions<RedisFunctions, 2 | 3, TypeMapping> & WithScripts<RedisScripts, 2 | 3, TypeMapping>;
}