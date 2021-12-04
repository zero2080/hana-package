package com.hana.project.configuration.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.hana.project.configuration.security.authentication.JwtProvider;
import com.hana.project.exceptions.ExceptionResponse;
import com.hana.project.exceptions.InvalidJwtException;
import com.hana.project.exceptions.type.AuthErrorCode;
import com.hana.project.exceptions.type.BaseErrorCode;
import com.hana.project.exceptions.type.CommonErrorCode;
import com.hana.project.model.entity.AdminUser;
import java.io.IOException;
import java.io.PrintWriter;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.LockedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AuthenticationHandler implements AuthenticationSuccessHandler,
    AuthenticationFailureHandler, AuthenticationEntryPoint {

  private final ObjectMapper objectMapper;
  private final JwtProvider jwtProvider;

  @Override
  public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response,
      AuthenticationException exception) throws IOException {
    BaseErrorCode errorCode;
    if (exception instanceof InvalidJwtException) {
      errorCode = ((InvalidJwtException) exception).getErrorCode();
    } else if (exception instanceof BadCredentialsException) {
      errorCode = AuthErrorCode.BAD_CREDENTIAL;
    } else if (exception instanceof LockedException) {
      errorCode = AuthErrorCode.INVALID_PASSWORD;
    } else {
      errorCode = CommonErrorCode.SERVER_ERROR;
    }

    response.setStatus(errorCode.getStatus().value());
    response.setContentType(MediaType.APPLICATION_JSON_VALUE);
    response.setCharacterEncoding(StandardCharsets.UTF_8.name());
    try (PrintWriter writer = response.getWriter()) {
      writer.write(objectMapper.writeValueAsString(ExceptionResponse.from(errorCode)));
      writer.flush();
    }
  }

  @Override
  public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
      Authentication authentication) throws IOException, ServletException {
    // 로그인 검증 완료
    response.setStatus(HttpStatus.OK.value());
    response.setContentType(MediaType.APPLICATION_JSON_VALUE);
    response.setCharacterEncoding(StandardCharsets.UTF_8.name());

    Map<String, Object> responseBody = new HashMap<>();

    if (authentication.getPrincipal() instanceof AdminUser) {
      AdminUser loggedInUser = (AdminUser) authentication.getPrincipal();
      String token = jwtProvider.generateToken(loggedInUser);
      responseBody.put("accessToken", token);

    } else {
      response.setStatus(HttpStatus.UNAUTHORIZED.value());
      responseBody.put("errorCode", CommonErrorCode.INVALID_PARAMETER.getCode());
      responseBody.put("message", CommonErrorCode.INVALID_PARAMETER.getMessage());
    }

    try (PrintWriter writer = response.getWriter()) {
      writer.write(objectMapper.writeValueAsString(responseBody));
      writer.flush();
    }
  }

  @Override
  public void commence(HttpServletRequest request, HttpServletResponse response,
      AuthenticationException e) throws IOException, ServletException {
    response.sendError(HttpServletResponse.SC_UNAUTHORIZED, e.getLocalizedMessage());
  }
}