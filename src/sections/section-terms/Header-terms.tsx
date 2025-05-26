import { FC } from "react";


const navItems =[
  {  label: "Testimonials",
    href: "#testimonials",
}]; 


const HeaderTerms: FC = () => {
    return <div className="container !max-w-full">
        <div className="flex justify-between h-20 items-center">
            <div>
                <a href="/">
                <span className="text-xl font-bold uppercase">Dhiran madhukar</span>
                </a>
            </div>
        </div>
    </div>;
};

export default HeaderTerms;