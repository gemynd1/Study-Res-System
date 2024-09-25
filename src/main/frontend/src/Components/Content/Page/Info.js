import React, {useEffect, useState} from "react";
import '../../../style/info.css'
const Info = () => {

    const [searchResults, setSearchResults] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [resultsPerpage, setResultsPerpage] = useState(10);


    useEffect(() => {
        const result = [
            {
                title: "당일권",
                time: "1시간",
                price: "1,500"
            },
            {
                title: "당일권",
                time: "2시간",
                price: "3,000"
            },
            {
                title: "당일권",
                time: "4시간",
                price: "5,000"
            },
            {
                title: "당일권",
                time: "6시간",
                price: "6,000"
            },
            {
                title: "당일권",
                time: "9시간",
                price: "8,000"
            },
            {
                title: "당일권",
                time: "12시간",
                price: "10,000"
            },
            {
                title: "정기권",
                time: "30시간",
                price: "45,000"
            },
            {
                title: "정기권",
                time: "50시간",
                price: "60,000"
            },
            {
                title: "정기권",
                time: "100시간",
                price: "110,000"
            },
            {
                title: "정기권",
                time: "4주 정기권",
                price: "120,000"
            },
            {
                title: "정기권",
                time: "8주 정기권",
                price: "230,000"
            },
            {
                title: "정기권",
                time: "1년 정기권",
                price: "800,000"
            },
            {
                title: "스터디룸",
                time: "수성방",
                price: "1,000"
            },
            {
                title: "스터디룸",
                time: "금성방",
                price: "2,000"
            },
            {
                title: "스터디룸",
                time: "지구방",
                price: "3,000"
            },
            {
                title: "스터디룸",
                time: "화성방",
                price: "4,000"
            },
        ];
        setSearchResults(result);
    }, []);

    const SameDayTicket = searchResults.filter(item => item.title === '당일권');
    const SeasonTicket = searchResults.filter(item => item.title === '정기권');
    const StudyRoom = searchResults.filter(item => item.title === '스터디룸');

    console.log(SameDayTicket);

    const indexOfLastResult = currentPage * resultsPerpage;
    const indexOfFirstResult = indexOfLastResult - resultsPerpage;
    const currentResults = searchResults.slice(indexOfFirstResult, indexOfLastResult);

    return (
        <div className="InfoBody">
            <div className="InfoBanner">
                <div className="InfoBannerLogo">
                    <div className="InfoBannerLogo1">
                        <img src='/img/icon/logo.png' align="로고" style={{ width: "95px", height: "77px"}}/>
                        <span>SN 스터디</span>
                    </div>
                </div>
                <div className="InfoBannerAll">
                    <div className="InfoBannerBox">
                        <span>SN 스터디 요금 안내</span>
                    </div>
                </div>
                <div className="InfoBody1">
                    <div className="InfoBody2">
                        <div className="InfoDetail">
                            <div className="InfoDetail1">
                                <img src='/img/icon/coffee.png' align="커피"
                                     style={{width: "40px", height: "40px", margin: "5px 10px 0 0"}}/>
                                <span>SN 스터디는 24시간 무인 시스템으로 운영되며</span>
                            </div>
                            <div className="InfoDetail2">
                                <span>이용하시는 모든 분들께 커피와 음료, 차 등이 무료로 제공됩니다</span>
                            </div>
                        </div>
                    </div>

                    <div className="InfoBox">
                        <div className="InfoBox1">
                            <span>당일권</span>
                        </div>
                        <div className="InfoBox2">
                            {SameDayTicket.map((result, index) => (
                                <div className="TicketRow" key={index}>
                                    <div className="TicketText">
                                        <span>{result.time}</span>
                                        <span className="priceText">{result.price}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="InfoBox">
                        <div className="InfoBox1">
                            <span>정기권</span>
                        </div>
                        <div className="InfoBox2">
                            {SeasonTicket.map((result, index) => (
                                <div className="TicketRow" key={index}>
                                    <div className="TicketText">
                                        <span>{result.time}</span>
                                        <span className="priceText">{result.price}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="InfoBox">
                        <div className="InfoBox1">
                            <span>스터디룸</span>
                        </div>
                        <div className="InfoBox2">
                            {StudyRoom.map((result, index) => (
                                <div className="TicketRow" key={index}>
                                    <div className="TicketText1">
                                        <span>{result.time}</span>
                                        <span className="priceText">{result.price}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Info;