package com.hana.project.controller;

import static org.hamcrest.Matchers.is;
import static org.hamcrest.Matchers.notNullValue;
import static org.springframework.restdocs.payload.JsonFieldType.ARRAY;
import static org.springframework.restdocs.payload.JsonFieldType.NUMBER;
import static org.springframework.restdocs.payload.JsonFieldType.STRING;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.requestFields;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.hana.BaseProjectApplicationTest;
import java.util.Map;
import org.junit.jupiter.api.ClassOrderer;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestClassOrder;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.ResultActions;

@TestClassOrder(ClassOrderer.OrderAnnotation.class)
@Order(1)
public class LandingControllerTests extends BaseProjectApplicationTest {

  private String API_PATH = "/landing";

  @Test
  @DisplayName("랜딩페이지 최초 접속 - 성공")
  public void bootstrap_success() throws Exception {

    //When
    ResultActions result = mockMvc.perform(
        get(API_PATH)
            .accept(MediaType.APPLICATION_JSON)
            .contentType(MediaType.APPLICATION_JSON)
    );

    //Then
    result.andExpect(status().isOk())
        .andExpect(jsonPath("$.topImages").isArray())
        .andExpect(jsonPath("$.collections").isArray())
        .andExpect(jsonPath("$.blogs").isArray())
        .andExpect(jsonPath("$.collections.[0].id", is("3dfeeac7-0ce2-4dc4-8ff7-f522b9ef5e30")))
        .andExpect(jsonPath("$.collections.[0].type", is("쇼핑백")))
        .andExpect(jsonPath("$.collections.[0].thumb", is(notNullValue())))
        .andExpect(jsonPath("$.collections.[0].detail", is(notNullValue())))
        .andExpect(jsonPath("$.collections.[0].description", is("몽그레")));

    //Documentation
    result.andDo(document("landing/bootstrap",
        responseFields(
            fieldWithPath("topImages").type(ARRAY).description("최상단 Carousel 이미지"),
            fieldWithPath("collections").type(ARRAY).description("컬랙션"),
            fieldWithPath("blogs").type(ARRAY).description("블로그")
        ).andWithPrefix("collections.[]",
            fieldWithPath("id").type(STRING).description("UUID"),
            fieldWithPath("type").type(STRING).description("제품 타입"),
            fieldWithPath("createdAt").type(STRING).description("생성일"),
            fieldWithPath("thumb").type(STRING).description("썸네일 링크"),
            fieldWithPath("detail").type(ARRAY).description("디테일 이미지 링크 배열"),
            fieldWithPath("description").type(STRING).description("컬렉션 이름")
        ).andWithPrefix("blogs.[]",
            fieldWithPath("id").type(STRING).description("UUID"),
            fieldWithPath("title").type(STRING).description("글제목"),
            fieldWithPath("target").type(STRING).description("블로그 링크"),
            fieldWithPath("link").type(STRING).description("썸네일 링크"),
            fieldWithPath("createdAt").type(STRING).description("작성일"))));
  }

  @Test
  @DisplayName("견적 메일 발송 테스트 - 성공")
  public void makingRequest_success() throws Exception {
    //Given
    Map<String, Object> requestBody = Map.of(
        "sample", "sample1",
        "width", 123,
        "height", 11,
        "depth", 44,
        "name", "오범수",
        "tel", "01071041482",
        "company", "zzzz",
        "email", "dhflhn@gmail.com");

    //When
    ResultActions result = mockMvc.perform(
        post(API_PATH + "/making-request")
            .content(new ObjectMapper().writeValueAsBytes(requestBody))
            .accept(MediaType.APPLICATION_JSON)
            .contentType(MediaType.APPLICATION_JSON)
    );

    //Then
    result.andExpect(status().isOk());

    //Documentation
    result.andDo(document("landing/making-request",
        requestFields(
            fieldWithPath("sample").type(STRING).description("샘플 이름"),
            fieldWithPath("count").type(NUMBER).description("제작 수량").optional(),
            fieldWithPath("width").type(NUMBER).description("가로").optional(),
            fieldWithPath("height").type(NUMBER).description("세로").optional(),
            fieldWithPath("depth").type(NUMBER).description("폭").optional(),
            fieldWithPath("tel").type(STRING).description("연락처"),
            fieldWithPath("name").type(STRING).description("연락처"),
            fieldWithPath("company").type(STRING).description("연락처"),
            fieldWithPath("email").type(STRING).description("이메일")
        )));
  }
}
