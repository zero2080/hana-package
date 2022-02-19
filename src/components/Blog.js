import styled from 'styled-components';
import {format} from 'date-fns';

const Wrapper = styled.div`
    display:flex;
    flex-wrap: wrap;
    justify-content: center;
`;

const Article = styled.div`
    margin: 0 12.5px 40px;
    &>p:nth-of-type(1){
        font-size:16px;
        padding-bottom:5px;
    }
    &>p:nth-of-type(2){
        font-size:14px;
        color:#757575;
    }
`;

const Thumbnail = styled.div`
    width:250px;
    height:200px;
    margin-bottom:20px;
    ${({image})=>`background-image:url(${image});`}
    background-position:center;
    background-size:cover;
`;

const Blog = ({blogs})=>{
    const onClick=(target)=>{
        window.open(target);
    }
    return (
        <Wrapper>
            {
                blogs.map((each,idx)=>{
                    let title = each.title.length>20?`${each.title.substring(0,20)} ...`:each.title;

                    return (<Article key={`blog_${idx}`} onClick={()=>onClick(each.target)}>
                        <Thumbnail image={each.link}/>
                        <p>{title}</p>
                        <p>{format(new Date(each.createdAt),'yyyy-MM-dd')}</p>
                    </Article>)
                })
            }
        </Wrapper>
    )
}

export default Blog;