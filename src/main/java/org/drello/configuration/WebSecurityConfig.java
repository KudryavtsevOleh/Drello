package org.drello.configuration;

import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;

import javax.servlet.http.HttpServletResponse;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private CustomAuthenticationEntryPoint customAuthenticationEntryPoint;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .authorizeRequests()
                .antMatchers("/").permitAll()
                .antMatchers("/**", "/health").permitAll()
                .antMatchers("/**").permitAll()

                /*.antMatchers(HttpMethod.POST, FORMS_URL).hasRole(ADMIN)
                .antMatchers(HttpMethod.PATCH, FORMS_URL).hasAnyRole(ADMIN, USER)
                .antMatchers(HttpMethod.GET, FORMS_DOWNLOAD_URL).hasRole(ADMIN)
                .antMatchers(HttpMethod.DELETE, FORMS_URL).hasRole(ADMIN)
                .antMatchers(HttpMethod.PATCH, FORM_COMPLETE_URL).hasRole(USER)
                .antMatchers(HttpMethod.PUT, ACTIVATE_OMNI_KEY_URL).hasRole(ADMIN)*/

                .anyRequest().authenticated()
                .and()

                .formLogin()
                .loginPage("/")
                .loginProcessingUrl("/auth/login")
                .failureHandler(failureHandler())
                .successHandler(successHandler())
                .and()

                .logout()
                .logoutUrl("/logout")
                .logoutSuccessHandler(successLogoutHandler())
                .deleteCookies("JSESSIONID")
                .invalidateHttpSession(true)

                .and()
                .httpBasic()
                .and()
                .exceptionHandling()
                .authenticationEntryPoint(customAuthenticationEntryPoint)
                .and()
                .csrf().disable();
    }

    @Override
    public void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth
                .userDetailsService(userDetailsService)
                .passwordEncoder(new BCryptPasswordEncoder());
    }

    private AuthenticationFailureHandler failureHandler() {
        return (request, response, e) -> {
            String errorMessage = "Incorrect username or password";

            if (!(e instanceof BadCredentialsException)) {
                errorMessage = e.getMessage();
            }

            try {
                response.setContentType("application/json");
                response.getWriter().print(new JSONObject().accumulate("error", errorMessage));
            } catch (JSONException exception) {
                exception.printStackTrace();
            }
        };
    }

    private AuthenticationSuccessHandler successHandler() {
        return (request, response, authentication) -> {
            try {
                response.setContentType("application/json");
                response.getWriter().print(new JSONObject().accumulate("success", true));
            } catch (JSONException ex) {
                ex.printStackTrace();
            }
        };
    }

    private LogoutSuccessHandler successLogoutHandler() {
        return (request, response, authentication) -> {
            try {
                response.setStatus(HttpServletResponse.SC_OK);
            } catch (Exception ex) {
                ex.printStackTrace();
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            }
        };
    }

}