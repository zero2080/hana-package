# README
 [하나패키지](https://hana-package.syopingbaeg.com) 의 백/프론트 레파지토리
 개인 프로젝트겸 외주 작업으로 깃플로우는 적용하지 않았으며 대부분 Rebase Merge를 통해 한 브랜치에 통합하며 작업되었음
 
 ## Branch
   - master
     - 서비스 
       - SPA 랜딩페이지
       - 게시물 노출
       - 카카오톡 문의
       - 메일문의
   - admin
     - 관리자 페이지
       - 로그인
       - 계정 정보 수정
       - 게시물 관리 ( CRD )
   - back
     - 백엔드
       - ORM
       - TDD

## 1. Front-end 
  - 서비스
    - Language : JavaScript(React.js)
    - CI/CD : Github action > AWS - S3 > Cloud Front(https)
  - Admin
    - Language : JavaScript(React.js)
    - CI/CD : Github action > AWS - S3 > Cloud Front(https)
    - ETC
      - JWT Token Authorization

## 2. Back-end
  - Language : Java 11 - Spring boot
    - JPA(Hibernate)
    - Flyway - Schema Version Management
  - DB : Mariadb
  - Test Driven Development
    - Junit5
    - RestDocs
  - Mail Sender
    - Naver Cloud Mail Sender
  - AWS
    - Elastic Beanstalk - Server Instance
    - RDS
