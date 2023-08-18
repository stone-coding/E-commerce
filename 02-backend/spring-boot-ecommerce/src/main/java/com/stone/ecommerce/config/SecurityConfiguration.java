package com.stone.ecommerce.config;

import com.okta.spring.boot.oauth.Okta;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.accept.ContentNegotiationStrategy;
import org.springframework.web.accept.HeaderContentNegotiationStrategy;

@Configuration
public class SecurityConfiguration {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{

        // protect endpoint /api/orders
        http.authorizeRequests(configurer ->
                            configurer
                                    // protect the endpoint only accessible to authenticated users
                                    .antMatchers("/api/orders/**")
                                    .authenticated())
                // configures OAuth2 resource server support
                .oauth2ResourceServer()
                // enable transfer origin to jwd-encoded bearer token
                .jwt();

        //add CORS support
        http.cors();

        // add content negotiation strategy
        http.setSharedObject(ContentNegotiationStrategy.class,
                            new HeaderContentNegotiationStrategy());

        // force a non-empty response body for 401's to make the response more friendly
        Okta.configureResourceServer401ResponseBody(http);

        // disable CSRF since we are not using Cookies for session tracking
        http.csrf().disable();
        
        return http.build();
    }
}





