import { FaHeart, FaHatWizard, FaUserTie, FaBookOpen, FaChild, FaPlane, FaPrayingHands, FaLaptopCode, FaBriefcase, FaUtensils, FaLeaf, FaSkull, FaGraduationCap, } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoFlash } from "react-icons/io5";
import { Category } from "../types/category";
import { Rb_Button, Rb_Icon, Rb_Text } from "@rentbook/rentbook-ui-lib";

interface Props {
    category: Category;
    onClick: (category: Category) => void;
}

const CategoryCard = ({ category, onClick }: Props) => {
    let icon = FaBookOpen;

    switch (category.name.toLowerCase()) {
        case "romance":
            icon = FaHeart;
            break;

        case "fantasy":
            icon = FaHatWizard;
            break;

        case "mystery":
            icon = FaMagnifyingGlass;
            break;

        case "thriller":
            icon = IoFlash;
            break;

        case "biography":
            icon = FaUserTie;
            break;

        case "autobiography":
            icon = FaBookOpen;
            break;

        case "business":
            icon = FaBriefcase;
            break;

        case "technology":
            icon = FaLaptopCode;
            break;

        case "travel":
            icon = FaPlane;
            break;

        case "cooking":
            icon = FaUtensils;
            break;

        case "health & wellness":
            icon = FaLeaf;
            break;

        case "religion & spirituality":
            icon = FaPrayingHands;
            break;

        case "young adult":
            icon = FaChild;
            break;

        case "horror":
            icon = FaSkull;
            break;

        case "education":
            icon = FaGraduationCap;
            break;
    }

    return (
        <Rb_Button
            variant="primary"
            onClick={() => onClick(category)}
            className="w-full min-h-40 p-4 !border !border-[#D1D5DB] rounded-xl flex flex-col items-center justify-center gap-3 !bg-white hover:!bg-white hover:shadow-md hover:-translate-y-1">
            <div
                className="bg-[#EAF3FF] flex h-14 w-14 items-center justify-center rounded-full"
            >
                <Rb_Icon
                    icon={icon}
                    size={24}
                    color="#316BFF"
                />
            </div>

            <Rb_Text className="text-center font-semibold capitalize text-[#1B1530] break-words">
                {category.name}
            </Rb_Text>
        </Rb_Button>
    );
};

export default CategoryCard;