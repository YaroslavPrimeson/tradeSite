import React from 'react';
import Section1 from "./sections/Section1";
import Section2 from "./sections/Section2";
import Section3 from "./sections/Section3";
import Section4 from "./sections/Section4";
import Section5 from "./sections/Section5";
import SectionVideoPlayer from "./sections/SectionVideoPlayer";
import SectionPrice from "./sections/SectionPrice";

const Landing = () => {
    return (
        <div className="landing">
            <Section1/>
            <SectionPrice/>
            <Section2/>
            <Section3/>
            <SectionVideoPlayer/>
            <Section4/>
            <Section5/>
        </div>
    );
};

export default Landing;