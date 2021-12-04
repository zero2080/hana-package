package com.hana.project.controller;

import static org.hamcrest.Matchers.is;
import static org.hamcrest.Matchers.notNullValue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.delete;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.fileUpload;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.put;
import static org.springframework.restdocs.payload.JsonFieldType.STRING;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.requestFields;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.partWithName;
import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
import static org.springframework.restdocs.request.RequestDocumentation.requestParameters;
import static org.springframework.restdocs.request.RequestDocumentation.requestParts;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.hana.BaseProjectApplicationTest;
import com.hana.project.support.WithMockAdmin;
import java.util.Map;
import org.junit.jupiter.api.ClassOrderer;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestClassOrder;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.web.servlet.ResultActions;


@TestClassOrder(ClassOrderer.OrderAnnotation.class)
@Order(2)
public class AdminControllerTests extends BaseProjectApplicationTest {

  private static String API_PATH = "/admin";
  private static String COLLECTION_PATH = "/admin/collection";
  private static String INTRODUCE_PATH = "/admin/introduce";
  private static String BLOG_PATH = "/admin/blog";
  private static String TOP_PATH = "/admin/top";

  private final ObjectMapper mapper = new ObjectMapper();
  @MockBean
  private PasswordEncoder passwordEncoder;

  @Test
  @DisplayName("관리자 로그인 - 성공")
  public void adminLogin_success() throws Exception {
    //Given
    Map<String, String> requestBody = Map.of("username", "admin", "password", "admin");

    when(passwordEncoder.matches(eq("admin"), any(String.class)))
        .thenReturn(true);

    //When
    ResultActions result = mockMvc.perform(
        post(API_PATH + "/authenticate")
            .accept(MediaType.APPLICATION_JSON)
            .contentType(MediaType.APPLICATION_JSON)
            .content(mapper.writeValueAsString(requestBody))
    );

    //Then
    result.andExpect(status().isOk())
        .andExpect(
            jsonPath("$.accessToken", is(notNullValue()))
        );

    // Documentation
    result.andDo(document("admin/profile/login",
        requestFields(
            fieldWithPath("username").description("로그인 ID"),
            fieldWithPath("password").description("비밀번호")
        ),
        responseFields(
            fieldWithPath("accessToken").type(STRING).description("JWT")
        )));
  }

  @Test
  @WithMockAdmin
  @DisplayName("관리자 계정 비밀번호 변경 - 성공")
  public void adminPasswordChange_success() throws Exception {
    //Given
    Map<String, String> changePassword = Map.of("before", "admin", "after", "changed");

    //When
    ResultActions result = mockMvc.perform(
        put(API_PATH + "/profile")
            .accept(MediaType.APPLICATION_JSON)
            .contentType(MediaType.APPLICATION_JSON)
            .content(mapper.writeValueAsString(changePassword))
    );

    //Then
    result.andExpect(status().isOk());

    //Documentation
    result.andDo(document("admin/profile/change-password",
        requestFields(
            fieldWithPath("before").description("이전 비밀번호"),
            fieldWithPath("after").description("변경할 비밀번호")
        )));
  }

  @Test
  @WithMockAdmin
  @DisplayName("콜렉션 업로드 - 성공")
  public void collection_write_success() throws Exception {
    // Given
    MockMultipartFile mockFile = new MockMultipartFile(
        "files", "mock_test_file.jpg", "image/jpeg", "File content".getBytes());

    // When
    ResultActions result = mockMvc.perform(
        fileUpload(COLLECTION_PATH)
            .file(mockFile)
            .queryParam("title", "상품명인것")
            .queryParam("type", "쇼핑백")
            .contentType(MediaType.MULTIPART_FORM_DATA)
            .accept(MediaType.APPLICATION_JSON));

    // Then
    result.andExpect(status().isOk());

    // Documentation
    result.andDo(document("admin/collection/write",
        requestParts(
            partWithName("files").description("컬렉션 파일 첫 첫이미지로 썸네일 제작함(정사각형 추천)")
        ),
        requestParameters(
            parameterWithName("title").description("제품 명"),
            parameterWithName("type").description("제품 타입")
        )
    ));

  }

  @Test
  @WithMockAdmin
  @DisplayName("콜렉션 삭제 - 성공")
  public void collection_delete_success() throws Exception {
    //Given
    String id = "10c12cb5-4ec8-4588-a1a0-0121e3b47ec2";

    //When
    ResultActions result = mockMvc.perform(
        delete(COLLECTION_PATH + "/{id}", id)
            .contentType(MediaType.APPLICATION_JSON)
            .accept(MediaType.APPLICATION_JSON));

    //Then
    result.andExpect(status().isOk());

    //Documentation
    result.andDo(
        document("admin/collection/delete",
            pathParameters(
                parameterWithName("id").description("콜렉션 ID")
            ))
    );
  }

  @Test
  @WithMockAdmin
  @DisplayName("블로그 업로드 - 성공")
  public void blog_write_success() throws Exception {
    //Given
    MockMultipartFile mockFile = new MockMultipartFile(
        "thumb", "mock_test_file.jpg", "image/jpeg", "File content".getBytes());

    //When
    ResultActions result = mockMvc.perform(
        fileUpload(BLOG_PATH)
            .file(mockFile)
            .queryParam("title", "블로그 테스트 타이틀")
            .queryParam("link", "테스트링크")
            .contentType(MediaType.MULTIPART_FORM_DATA)
            .accept(MediaType.APPLICATION_JSON));

    //Then
    result.andExpect(status().isOk());

    //Documentation
    result.andDo(document("admin/blog/write",
        requestParts(
            partWithName("thumb").description("블로그 썸네일")
        ),
        requestParameters(
            parameterWithName("title").description("블로그 제목"),
            parameterWithName("link").description("링크 주소")
        )));
  }

  @Test
  @WithMockAdmin
  @DisplayName("불로그 삭제 - 성공")
  public void blog_delete_success() throws Exception {
    //Given
    String id = "bbbb0001-bbbb-bbbb-bbbb-aaaaaa000002";

    //When
    ResultActions result = mockMvc.perform(
        delete(BLOG_PATH + "/{id}", id)
            .contentType(MediaType.APPLICATION_JSON)
            .accept(MediaType.APPLICATION_JSON));

    //Then
    result.andExpect(status().isOk());

    //Documentation
    result.andDo(
        document("admin/blog/delete",
            pathParameters(
                parameterWithName("id").description("블로그 ID")
            ))
    );
  }

  @Test
  @WithMockAdmin
  @DisplayName("상단 이미지 등록 - 성공")
  public void top_write_success() throws Exception {
    //Given
    MockMultipartFile mockFile = new MockMultipartFile(
        "thumb", "mock_test_file.jpg", "image/jpeg", "File content".getBytes());

    //When
    ResultActions result = mockMvc.perform(
        fileUpload(TOP_PATH)
            .file(mockFile)
            .contentType(MediaType.MULTIPART_FORM_DATA)
            .accept(MediaType.APPLICATION_JSON));

    //Then
    result.andExpect(status().isOk());

    //Documentation
    result.andDo(document("admin/top/write",
        requestParts(
            partWithName("thumb").description("상단 이미지")
        )));
  }

  @Test
  @WithMockAdmin
  @DisplayName("상단 이미지 삭제 - 성공")
  public void top_delete_success() throws Exception {
    //Given
    String id = "00000006-abab-bbbb-bbbb-01010101aabb";

    //When
    ResultActions result = mockMvc.perform(
        delete(TOP_PATH + "/{id}", id)
            .contentType(MediaType.APPLICATION_JSON)
            .accept(MediaType.APPLICATION_JSON));

    //Then
    result.andExpect(status().isOk());

    //Documentation
    result.andDo(
        document("admin/top/delete",
            pathParameters(
                parameterWithName("id").description("이미지 ID")
            ))
    );
  }

  @Test
  @WithMockAdmin
  @DisplayName("소개 영역 좌측 샘플 이미지 변경 - 성공")
  public void changeIntroduceProductThumbnail_success() throws Exception {
    //Given
    MockMultipartFile mockFile = new MockMultipartFile(
        "file", "mock_test_file.jpg", "image/jpeg", "File content".getBytes());

    //When
    ResultActions result = mockMvc.perform(
        fileUpload(INTRODUCE_PATH + "/product/")
            .file(mockFile)
            .contentType(MediaType.MULTIPART_FORM_DATA)
            .accept(MediaType.APPLICATION_JSON));

    //Then
    result.andExpect(status().isOk());

    //Documentation
    result.andDo(document("admin/introduce/product",
        requestParts(
            partWithName("file").description("소개 영역 좌측 상품이미지")
        )
    ));
  }

  @Test
  @WithMockAdmin
  @DisplayName("소개 영역 하단 이미지 변경 - 성공")
  public void changeIntroduceProductBackground_success() throws Exception {
    //Given
    MockMultipartFile mockFile = new MockMultipartFile(
        "file", "mock_test_file.jpg", "image/jpeg", "File content".getBytes());

    //When
    ResultActions result = mockMvc.perform(
        fileUpload(INTRODUCE_PATH + "/background/")
            .file(mockFile)
            .contentType(MediaType.MULTIPART_FORM_DATA)
            .accept(MediaType.APPLICATION_JSON));

    //Then
    result.andExpect(status().isOk());

    //Documentation
    result.andDo(document("admin/introduce/background",
        requestParts(
            partWithName("file").description("소개 영역 하단 이미지")
        )
    ));
  }
}
