import { useParams } from 'react-router-dom'
import { Calendar, Clock, User, Tag, Eye, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import CodeBlock from './CodeBlock'
import { Button } from '@/components/ui/button'
import { getArticleBySlug } from '../data/articles'

const ArticlePage = () => {
  const { slug } = useParams()
  const article = getArticleBySlug(slug)

  // Se artigo não encontrado
  if (!article) {
    return (
      <div className="min-h-screen bg-[#1A1A1B] text-[#E8E8E8]">
        <Header />
        <main className="pt-20 flex items-center justify-center min-h-[60vh]">
          <div className="text-center px-4">
            <h1 className="text-4xl font-geist font-bold text-[#E8E8E8] mb-4">
              Artigo não encontrado
            </h1>
            <p className="text-[#E8E8E8]/70 font-roboto mb-8">
              O artigo que você está procurando não existe ou foi removido.
            </p>
            <Link to="/">
              <Button className="bg-[#FFD15A] text-black hover:bg-[#FFD15A]/90 font-roboto font-medium">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar para Home
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  // Conteúdo específico do artigo JWT
  const getJWTContent = () => {
    if (slug !== 'spring-boot-jwt-autenticacao-completa') {
      return (
        <div className="prose prose-invert max-w-none">
          <h2 className="text-2xl font-geist font-bold text-[#E8E8E8] mb-4">
            Artigo em Desenvolvimento
          </h2>
          <p className="text-[#E8E8E8]/80 font-roboto mb-6 leading-relaxed">
            Este artigo está sendo desenvolvido. Em breve teremos o conteúdo completo disponível.
            Continue acompanhando o JavaCodeLab para mais conteúdo de qualidade!
          </p>
        </div>
      )
    }

    return (
      <div className="prose prose-invert max-w-none">
        {/* Introdução */}
        <h2 id="introducao" className="text-2xl font-geist font-bold text-[#E8E8E8] mb-4 scroll-mt-24">
          Introdução ao JWT
        </h2>
        
        <p className="text-[#E8E8E8]/80 font-roboto mb-6 leading-relaxed">
          JSON Web Token (JWT) é um padrão aberto (RFC 7519) que define uma forma compacta e segura de transmitir informações entre partes como um objeto JSON. Em aplicações Spring Boot, JWT é amplamente utilizado para implementar autenticação stateless, especialmente em APIs REST.
        </p>

        <p className="text-[#E8E8E8]/80 font-roboto mb-6 leading-relaxed">
          Diferentemente das sessões tradicionais que são armazenadas no servidor, o JWT contém todas as informações necessárias sobre o usuário codificadas no próprio token. Isso torna a aplicação mais escalável e adequada para arquiteturas de microserviços.
        </p>

        <p className="text-[#E8E8E8]/80 font-roboto mb-8 leading-relaxed">
          Neste tutorial completo, vamos implementar um sistema robusto de autenticação JWT usando Spring Boot 3 e Spring Security 6, seguindo as melhores práticas de segurança da indústria.
        </p>

        {/* Configuração Inicial */}
        <h2 id="configuracao-inicial" className="text-2xl font-geist font-bold text-[#E8E8E8] mb-4 scroll-mt-24">
          Configuração Inicial do Projeto
        </h2>

        <p className="text-[#E8E8E8]/80 font-roboto mb-6 leading-relaxed">
          Vamos começar criando um novo projeto Spring Boot com as dependências necessárias. Você pode usar o Spring Initializr (start.spring.io) ou criar o projeto diretamente na sua IDE favorita.
        </p>

        <h3 id="dependencias" className="text-xl font-geist font-bold text-[#E8E8E8] mb-4 scroll-mt-24">
          Dependências Necessárias
        </h3>

        <p className="text-[#E8E8E8]/80 font-roboto mb-6 leading-relaxed">
          Para este tutorial, utilizaremos Java 17, Spring Boot 3.1.x e Maven como gerenciador de dependências. Adicione as seguintes dependências ao seu <code className="bg-[#2A2A2B] px-2 py-1 rounded text-[#FFD15A]">pom.xml</code>:
        </p>

        <CodeBlock 
          code={`<dependencies>
    <!-- Spring Boot Starters -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-security</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-jpa</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-validation</artifactId>
    </dependency>

    <!-- JWT Dependencies -->
    <dependency>
        <groupId>io.jsonwebtoken</groupId>
        <artifactId>jjwt-api</artifactId>
        <version>0.11.5</version>
    </dependency>
    <dependency>
        <groupId>io.jsonwebtoken</groupId>
        <artifactId>jjwt-impl</artifactId>
        <version>0.11.5</version>
        <scope>runtime</scope>
    </dependency>
    <dependency>
        <groupId>io.jsonwebtoken</groupId>
        <artifactId>jjwt-jackson</artifactId>
        <version>0.11.5</version>
        <scope>runtime</scope>
    </dependency>

    <!-- Database -->
    <dependency>
        <groupId>com.h2database</groupId>
        <artifactId>h2</artifactId>
        <scope>runtime</scope>
    </dependency>

    <!-- Lombok for cleaner code -->
    <dependency>
        <groupId>org.projectlombok</groupId>
        <artifactId>lombok</artifactId>
        <optional>true</optional>
    </dependency>
</dependencies>`}
          language="xml"
          filename="pom.xml"
        />

        {/* JWT Service */}
        <h2 id="jwt-service" className="text-2xl font-geist font-bold text-[#E8E8E8] mb-4 scroll-mt-24">
          Criando o JWT Service
        </h2>

        <p className="text-[#E8E8E8]/80 font-roboto mb-6 leading-relaxed">
          O JWT Service será responsável por gerar, validar e extrair informações dos tokens JWT. Esta classe centraliza toda a lógica relacionada ao JWT, facilitando manutenção e testes.
        </p>

        <CodeBlock 
          code={`package com.javacodelab.security.jwt;

import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtService {
    
    @Value("\${application.security.jwt.secret-key}")
    private String secretKey;
    
    @Value("\${application.security.jwt.expiration}")
    private long jwtExpiration;
    
    @Value("\${application.security.jwt.refresh-token.expiration}")
    private long refreshExpiration;
    
    /**
     * Extrai o username (subject) do token JWT
     */
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }
    
    /**
     * Extrai uma claim específica do token
     */
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }
    
    /**
     * Gera um token JWT para o usuário
     */
    public String generateToken(UserDetails userDetails) {
        return generateToken(new HashMap<>(), userDetails);
    }
    
    /**
     * Gera um token JWT com claims extras
     */
    public String generateToken(
            Map<String, Object> extraClaims,
            UserDetails userDetails
    ) {
        return buildToken(extraClaims, userDetails, jwtExpiration);
    }
    
    /**
     * Gera um refresh token
     */
    public String generateRefreshToken(UserDetails userDetails) {
        return buildToken(new HashMap<>(), userDetails, refreshExpiration);
    }
    
    /**
     * Constrói o token JWT
     */
    private String buildToken(
            Map<String, Object> extraClaims,
            UserDetails userDetails,
            long expiration
    ) {
        return Jwts
                .builder()
                .setClaims(extraClaims)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(getSignInKey(), SignatureAlgorithm.HS256)
                .compact();
    }
    
    /**
     * Valida se o token é válido para o usuário
     */
    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername())) && !isTokenExpired(token);
    }
    
    /**
     * Verifica se o token expirou
     */
    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }
    
    /**
     * Extrai a data de expiração do token
     */
    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }
    
    /**
     * Extrai todas as claims do token
     */
    private Claims extractAllClaims(String token) {
        return Jwts
                .parserBuilder()
                .setSigningKey(getSignInKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
    
    /**
     * Obtém a chave de assinatura
     */
    private Key getSignInKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}`}
          language="java"
          filename="JwtService.java"
        />

        {/* User Entity */}
        <h2 id="user-entity" className="text-2xl font-geist font-bold text-[#E8E8E8] mb-4 scroll-mt-24">
          Entidade User e UserDetails
        </h2>

        <p className="text-[#E8E8E8]/80 font-roboto mb-6 leading-relaxed">
          Vamos criar a entidade User que implementa UserDetails do Spring Security. Isso permite integração perfeita com o framework de segurança.
        </p>

        <CodeBlock 
          code={`package com.javacodelab.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "_user")
public class User implements UserDetails {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(unique = true, nullable = false)
    private String email;
    
    @Column(nullable = false)
    private String password;
    
    private String firstName;
    
    private String lastName;
    
    @Enumerated(EnumType.STRING)
    private Role role;
    
    @Builder.Default
    private Boolean enabled = true;
    
    @Builder.Default
    private Boolean accountNonExpired = true;
    
    @Builder.Default
    private Boolean accountNonLocked = true;
    
    @Builder.Default
    private Boolean credentialsNonExpired = true;
    
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("ROLE_" + role.name()));
    }
    
    @Override
    public String getPassword() {
        return password;
    }
    
    @Override
    public String getUsername() {
        return email;
    }
    
    @Override
    public boolean isAccountNonExpired() {
        return accountNonExpired;
    }
    
    @Override
    public boolean isAccountNonLocked() {
        return accountNonLocked;
    }
    
    @Override
    public boolean isCredentialsNonExpired() {
        return credentialsNonExpired;
    }
    
    @Override
    public boolean isEnabled() {
        return enabled;
    }
    
    public String getFullName() {
        return firstName + " " + lastName;
    }
}

// Enum para roles
enum Role {
    USER,
    ADMIN,
    MODERATOR
}`}
          language="java"
          filename="User.java"
        />

        {/* Security Configuration */}
        <h2 id="security-config" className="text-2xl font-geist font-bold text-[#E8E8E8] mb-4 scroll-mt-24">
          Configuração do Spring Security
        </h2>

        <p className="text-[#E8E8E8]/80 font-roboto mb-6 leading-relaxed">
          A configuração do Spring Security é o coração da nossa implementação. Definiremos quais endpoints são públicos, quais requerem autenticação, e como o JWT será processado em cada requisição.
        </p>

        <CodeBlock 
          code={`package com.javacodelab.config;

import com.javacodelab.security.jwt.JwtAuthenticationEntryPoint;
import com.javacodelab.security.jwt.JwtAuthenticationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfiguration {
    
    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final UserDetailsService userDetailsService;
    
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    
    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService);
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }
    
    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration config
    ) throws Exception {
        return config.getAuthenticationManager();
    }
    
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .authorizeHttpRequests(authz -> authz
                        // Public endpoints
                        .requestMatchers("/api/v1/auth/**").permitAll()
                        .requestMatchers("/api/v1/public/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/v1/posts/**").permitAll()
                        .requestMatchers("/h2-console/**").permitAll()
                        .requestMatchers("/swagger-ui/**", "/v3/api-docs/**").permitAll()
                        
                        // Admin only endpoints
                        .requestMatchers("/api/v1/admin/**").hasRole("ADMIN")
                        
                        // All other requests need authentication
                        .anyRequest().authenticated()
                )
                .exceptionHandling(ex -> ex
                        .authenticationEntryPoint(jwtAuthenticationEntryPoint)
                )
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
                .authenticationProvider(authenticationProvider())
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
        
        // For H2 Console
        http.headers(headers -> headers.frameOptions().disable());
        
        return http.build();
    }
    
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOriginPatterns(List.of("*"));
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowCredentials(true);
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}`}
          language="java"
          filename="SecurityConfiguration.java"
        />

        {/* JWT Filter */}
        <h3 id="jwt-filter" className="text-xl font-geist font-bold text-[#E8E8E8] mb-4 scroll-mt-24">
          Filtro JWT Personalizado
        </h3>

        <p className="text-[#E8E8E8]/80 font-roboto mb-6 leading-relaxed">
          O filtro JWT intercepta todas as requisições e valida o token JWT presente no header Authorization.
        </p>

        <CodeBlock 
          code={`package com.javacodelab.security.jwt;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
@Slf4j
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    
    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;
    
    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain
    ) throws ServletException, IOException {
        
        final String authHeader = request.getHeader("Authorization");
        final String jwt;
        final String userEmail;
        
        // Verifica se o header Authorization está presente e começa com "Bearer "
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }
        
        // Extrai o token JWT (remove "Bearer " do início)
        jwt = authHeader.substring(7);
        
        try {
            // Extrai o username do token
            userEmail = jwtService.extractUsername(jwt);
            
            // Se o username existe e não há autenticação no contexto
            if (userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                
                // Carrega os detalhes do usuário
                UserDetails userDetails = this.userDetailsService.loadUserByUsername(userEmail);
                
                // Valida o token
                if (jwtService.isTokenValid(jwt, userDetails)) {
                    
                    // Cria o token de autenticação
                    UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                            userDetails,
                            null,
                            userDetails.getAuthorities()
                    );
                    
                    // Define detalhes da requisição
                    authToken.setDetails(
                            new WebAuthenticationDetailsSource().buildDetails(request)
                    );
                    
                    // Define a autenticação no contexto de segurança
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                    
                    log.debug("User '{}' authenticated successfully", userEmail);
                }
            }
        } catch (Exception e) {
            log.error("Cannot set user authentication: {}", e.getMessage());
        }
        
        filterChain.doFilter(request, response);
    }
}`}
          language="java"
          filename="JwtAuthenticationFilter.java"
        />

        {/* Authentication Controller */}
        <h2 id="auth-controller" className="text-2xl font-geist font-bold text-[#E8E8E8] mb-4 scroll-mt-24">
          Controller de Autenticação
        </h2>

        <p className="text-[#E8E8E8]/80 font-roboto mb-6 leading-relaxed">
          O AuthController expõe endpoints REST para login, registro e refresh de tokens. Implementaremos também validação de entrada e tratamento de erros.
        </p>

        <CodeBlock 
          code={`package com.javacodelab.controller;

import com.javacodelab.dto.auth.*;
import com.javacodelab.service.AuthenticationService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {
    
    private final AuthenticationService service;
    
    /**
     * Endpoint para registro de novos usuários
     */
    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(
            @Valid @RequestBody RegisterRequest request
    ) {
        return ResponseEntity.ok(service.register(request));
    }
    
    /**
     * Endpoint para autenticação (login)
     */
    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(
            @Valid @RequestBody AuthenticationRequest request
    ) {
        return ResponseEntity.ok(service.authenticate(request));
    }
    
    /**
     * Endpoint para refresh do token
     */
    @PostMapping("/refresh-token")
    public void refreshToken(
            HttpServletRequest request,
            HttpServletResponse response
    ) throws IOException {
        service.refreshToken(request, response);
    }
    
    /**
     * Endpoint para logout (invalidar token)
     */
    @PostMapping("/logout")
    public ResponseEntity<?> logout(
            HttpServletRequest request
    ) {
        service.logout(request);
        return ResponseEntity.ok().build();
    }
    
    /**
     * Endpoint para validar token
     */
    @GetMapping("/validate")
    public ResponseEntity<TokenValidationResponse> validateToken(
            HttpServletRequest request
    ) {
        return ResponseEntity.ok(service.validateToken(request));
    }
}`}
          language="java"
          filename="AuthenticationController.java"
        />

        {/* DTOs */}
        <h3 id="dtos" className="text-xl font-geist font-bold text-[#E8E8E8] mb-4 scroll-mt-24">
          DTOs de Requisição e Resposta
        </h3>

        <CodeBlock 
          code={`package com.javacodelab.dto.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {
    
    @NotBlank(message = "Nome é obrigatório")
    @Size(min = 2, max = 50, message = "Nome deve ter entre 2 e 50 caracteres")
    private String firstName;
    
    @NotBlank(message = "Sobrenome é obrigatório")
    @Size(min = 2, max = 50, message = "Sobrenome deve ter entre 2 e 50 caracteres")
    private String lastName;
    
    @NotBlank(message = "Email é obrigatório")
    @Email(message = "Email deve ter um formato válido")
    private String email;
    
    @NotBlank(message = "Senha é obrigatória")
    @Size(min = 8, message = "Senha deve ter pelo menos 8 caracteres")
    private String password;
}

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationRequest {
    
    @NotBlank(message = "Email é obrigatório")
    @Email(message = "Email deve ter um formato válido")
    private String email;
    
    @NotBlank(message = "Senha é obrigatória")
    private String password;
}

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationResponse {
    
    private String accessToken;
    private String refreshToken;
    private String tokenType = "Bearer";
    private Long expiresIn;
    private UserInfo user;
    
    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class UserInfo {
        private Long id;
        private String email;
        private String firstName;
        private String lastName;
        private String role;
    }
}`}
          language="java"
          filename="AuthenticationDTOs.java"
        />

        {/* Testing */}
        <h2 id="testando" className="text-2xl font-geist font-bold text-[#E8E8E8] mb-4 scroll-mt-24">
          Testando a Implementação
        </h2>

        <p className="text-[#E8E8E8]/80 font-roboto mb-6 leading-relaxed">
          Após implementar todos os componentes, é crucial testar a funcionalidade completa. Vamos usar comandos curl para testar os endpoints:
        </p>

        <CodeBlock 
          code={`# 1. Registrar novo usuário
curl -X POST http://localhost:8080/api/v1/auth/register \\
  -H "Content-Type: application/json" \\
  -d '{
    "firstName": "João",
    "lastName": "Silva",
    "email": "joao.silva@example.com",
    "password": "minhasenha123"
  }'

# Resposta esperada:
# {
#   "accessToken": "eyJhbGciOiJIUzI1NiJ9...",
#   "refreshToken": "eyJhbGciOiJIUzI1NiJ9...",
#   "tokenType": "Bearer",
#   "expiresIn": 86400000,
#   "user": {
#     "id": 1,
#     "email": "joao.silva@example.com",
#     "firstName": "João",
#     "lastName": "Silva",
#     "role": "USER"
#   }
# }

# 2. Fazer login
curl -X POST http://localhost:8080/api/v1/auth/authenticate \\
  -H "Content-Type: application/json" \\
  -d '{
    "email": "joao.silva@example.com",
    "password": "minhasenha123"
  }'

# 3. Acessar endpoint protegido
curl -X GET http://localhost:8080/api/v1/users/profile \\
  -H "Authorization: Bearer SEU_JWT_TOKEN_AQUI"

# 4. Refresh token
curl -X POST http://localhost:8080/api/v1/auth/refresh-token \\
  -H "Authorization: Bearer SEU_REFRESH_TOKEN_AQUI"

# 5. Validar token
curl -X GET http://localhost:8080/api/v1/auth/validate \\
  -H "Authorization: Bearer SEU_JWT_TOKEN_AQUI"

# 6. Logout
curl -X POST http://localhost:8080/api/v1/auth/logout \\
  -H "Authorization: Bearer SEU_JWT_TOKEN_AQUI"`}
          language="bash"
          filename="test-commands.sh"
        />

        {/* Configuration Properties */}
        <h3 id="configuracao-properties" className="text-xl font-geist font-bold text-[#E8E8E8] mb-4 scroll-mt-24">
          Configuração do application.yml
        </h3>

        <CodeBlock 
          code={`# application.yml
server:
  port: 8080

spring:
  application:
    name: javacodelab-auth
  
  datasource:
    url: jdbc:h2:mem:testdb
    driver-class-name: org.h2.Driver
    username: sa
    password: password
  
  jpa:
    database-platform: org.hibernate.dialect.H2Dialect
    hibernate:
      ddl-auto: create-drop
    show-sql: true
    properties:
      hibernate:
        format_sql: true
  
  h2:
    console:
      enabled: true
      path: /h2-console

# JWT Configuration
application:
  security:
    jwt:
      secret-key: 404E635266556A586E3272357538782F413F4428472B4B6250645367566B5970
      expiration: 86400000 # 24 hours
      refresh-token:
        expiration: 604800000 # 7 days

# Logging
logging:
  level:
    com.javacodelab: DEBUG
    org.springframework.security: DEBUG
    org.hibernate.SQL: DEBUG
    org.hibernate.type.descriptor.sql.BasicBinder: TRACE`}
          language="yaml"
          filename="application.yml"
        />

        {/* Melhorias e Considerações */}
        <h2 id="melhorias" className="text-2xl font-geist font-bold text-[#E8E8E8] mb-4 scroll-mt-24">
          Melhorias e Considerações de Segurança
        </h2>

        <p className="text-[#E8E8E8]/80 font-roboto mb-6 leading-relaxed">
          Uma implementação JWT robusta deve considerar vários aspectos de segurança e performance:
        </p>

        <h3 className="text-lg font-geist font-semibold text-[#E8E8E8] mb-3">
          1. Blacklist de Tokens
        </h3>
        <p className="text-[#E8E8E8]/80 font-roboto mb-4 leading-relaxed">
          Implemente um sistema de blacklist para tokens revogados, especialmente importante para logout e mudanças de senha.
        </p>

        <h3 className="text-lg font-geist font-semibold text-[#E8E8E8] mb-3">
          2. Rate Limiting
        </h3>
        <p className="text-[#E8E8E8]/80 font-roboto mb-4 leading-relaxed">
          Adicione rate limiting nos endpoints de autenticação para prevenir ataques de força bruta.
        </p>

        <h3 className="text-lg font-geist font-semibold text-[#E8E8E8] mb-3">
          3. Logs de Auditoria
        </h3>
        <p className="text-[#E8E8E8]/80 font-roboto mb-4 leading-relaxed">
          Registre todas as tentativas de login, sucessos e falhas para monitoramento de segurança.
        </p>

        <h3 className="text-lg font-geist font-semibold text-[#E8E8E8] mb-3">
          4. Configuração HTTPS
        </h3>
        <p className="text-[#E8E8E8]/80 font-roboto mb-6 leading-relaxed">
          Sempre use HTTPS em produção para proteger os tokens durante a transmissão.
        </p>

        <h2 id="conclusao" className="text-2xl font-geist font-bold text-[#E8E8E8] mb-4 scroll-mt-24">
          Conclusão
        </h2>

        <p className="text-[#E8E8E8]/80 font-roboto mb-6 leading-relaxed">
          Implementamos um sistema completo e robusto de autenticação JWT com Spring Boot e Spring Security. Esta implementação inclui:
        </p>

        <ul className="list-disc list-inside text-[#E8E8E8]/80 font-roboto mb-6 space-y-2">
          <li>Geração e validação segura de tokens JWT</li>
          <li>Refresh tokens para renovação automática</li>
          <li>Integração completa com Spring Security</li>
          <li>Validação de entrada e tratamento de erros</li>
          <li>Configuração CORS para aplicações frontend</li>
          <li>Endpoints RESTful bem documentados</li>
        </ul>

        <p className="text-[#E8E8E8]/80 font-roboto mb-6 leading-relaxed">
          Com esta base sólida, você pode expandir a funcionalidade adicionando recursos como recuperação de senha, verificação de email, autenticação de dois fatores e muito mais.
        </p>

        <p className="text-[#E8E8E8]/80 font-roboto mb-6 leading-relaxed">
          Continue acompanhando o JavaCodeLab para mais tutoriais avançados sobre Spring Security, microserviços e arquitetura de aplicações enterprise!
        </p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#1A1A1B] text-[#E8E8E8]">
      <Header />
      
      <main className="pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-[#E8E8E8]/60 font-roboto mb-8">
            <Link to="/" className="hover:text-[#FFD15A] transition-colors duration-200">
              Home
            </Link>
            <span>/</span>
            <Link to="/blog" className="hover:text-[#FFD15A] transition-colors duration-200">
              Blog
            </Link>
            <span>/</span>
            <span className="text-[#E8E8E8]/80">{article.category}</span>
            <span>/</span>
            <span className="text-[#FFD15A]">{article.title}</span>
          </nav>

          <article>
            {/* Article Header */}
            <header className="mb-12">
              {/* Back Button */}
              <Link to="/" className="inline-flex items-center gap-2 text-[#E8E8E8]/70 hover:text-[#FFD15A] font-roboto mb-6 transition-colors duration-200">
                <ArrowLeft className="w-4 h-4" />
                Voltar para Home
              </Link>

              {/* Category Tag */}
              <div className="mb-6">
                <span className="inline-block px-4 py-2 bg-[#02a9f7] text-white rounded-full text-sm font-roboto font-medium">
                  {article.category}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-geist font-bold text-[#E8E8E8] mb-6 leading-tight">
                {article.title}
              </h1>

              {/* Excerpt */}
              <p className="text-xl text-[#E8E8E8]/80 font-roboto mb-8 leading-relaxed">
                {article.excerpt}
              </p>

              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-[#E8E8E8]/60 font-roboto mb-6">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{article.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{article.publishDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{article.readTime} de leitura</span>
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  <span>{article.views} visualizações</span>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-[#2A2A2B] text-[#E8E8E8]/70 rounded-full text-sm font-roboto hover:bg-[#FFD15A]/10 hover:text-[#FFD15A] transition-colors duration-200 cursor-pointer"
                  >
                    <Tag className="w-3 h-3" />
                    {tag}
                  </span>
                ))}
              </div>

              {/* Featured Image */}
              <div className="aspect-video bg-gradient-to-br from-[#02a9f7]/20 to-[#FFD15A]/20 rounded-xl mb-8 overflow-hidden">
                <div className="w-full h-full bg-black/20 flex items-center justify-center">
                  <span className="text-6xl">🔐</span>
                </div>
              </div>
            </header>

            {/* Article Content */}
            {getJWTContent()}

            {/* Author Section */}
            <div className="bg-[#2A2A2B] rounded-xl border border-white/10 p-8 my-12">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-gradient-to-br from-[#FFD15A]/20 to-[#02a9f7]/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl font-geist font-bold text-[#FFD15A]">
                    PS
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="font-geist font-bold text-xl text-[#E8E8E8] mb-2">
                    Paulo Sarraff
                  </h3>
                  <p className="text-[#FFD15A] font-roboto mb-3">
                    Desenvolvedor Java Sênior & Tech Lead
                  </p>
                  <p className="text-[#E8E8E8]/80 font-roboto leading-relaxed">
                    Desenvolvedor Java com mais de 8 anos de experiência em Spring Framework, 
                    arquitetura de microserviços e desenvolvimento de aplicações enterprise. 
                    Apaixonado por compartilhar conhecimento e ajudar outros desenvolvedores 
                    a crescerem em suas carreiras.
                  </p>
                </div>
              </div>
            </div>

            {/* Back to Home */}
            <div className="text-center my-12">
              <Link to="/">
                <Button className="bg-[#FFD15A] text-black hover:bg-[#FFD15A]/90 font-roboto font-medium">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Voltar para Home
                </Button>
              </Link>
            </div>
          </article>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default ArticlePage
