import { NextPageContext } from "next";
import { API_KEY } from "@/constants/links";
import MainLayout from "../../components/MainLayout";
import Image from "@/components/Image";
import defaultPersonImage from "../../app/assets/images/default-person-image.svg";
import Button from "@/app/components/UI/Button";
import Title from "@/app/components/UI/Title/Title";
import { getPersonGender } from "@/handlers/getPersonGender";
import {
  faCalendarCheck,
  faFlag,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Person = ({ personFromProps }) => {
  const [person, setPerson] = useState(personFromProps);
  const router = useRouter();
  const gender = getPersonGender(person);

  const test = () => {};

  useEffect(() => {
    const fetchPerson = async () => {
      try {
        const linkToFetch = `https://api.themoviedb.org/3/person/${router.query.id}?api_key=${API_KEY}`;
        const response = await fetch(linkToFetch);
        const result = await response.json();

        setPerson(result);
      } catch (error) {
        setPerson(null);
      }
    };

    if (!personFromProps) fetchPerson();
  }, []);

  return (
    <MainLayout>
      <div className="w-full flex gap-x-7 py-7">
        <div className="w-full max-w-[340px]">
          <Image
            src={`https://image.tmdb.org/t/p/w440_and_h660_face${person.profile_path}`}
            defaultImage={defaultPersonImage}
          />
        </div>
        <div className="w-full">
          <Title className="text-7xl">{person.name}</Title>
          <Title variant="h2" className="mb-5 text-slate-400">
            {person.known_for_department}
          </Title>
          <div className="mb-5">
            <div className="flex items-center text-sm">
              <FontAwesomeIcon className="mr-1.5" icon={faFlag} />
              <span className="mr-1.5">Place of birth:</span>
              <span>{person.place_of_birth}</span>
            </div>
            <div className="flex items-center text-sm">
              <FontAwesomeIcon className="mr-1.5" icon={faCalendarCheck} />
              <span className="mr-1.5">Date of birth:</span>
              <span>
                <span>{moment(person.birthday).format("MM.DD.YYYY")}</span>
                {person.deathday && (
                  <span>
                    {" "}
                    — Date of death:{" "}
                    {moment(person.deathday).format("MM.DD.YYYY")}
                  </span>
                )}
              </span>
            </div>
            <div className="flex items-center text-sm">
              <FontAwesomeIcon className="mr-1.5" icon={faUser} />
              <span className="mr-1.5">Gender: {gender}</span>
            </div>
          </div>
          <p className="text-base mb-6">{person.biography}</p>
          <Button className="mt-auto" onClick={test}>
            Add to favorites
          </Button>
        </div>
      </div>
    </MainLayout>
  );
};

export const getServerSideProps = async (ctx: NextPageContext) => {
  try {
    const linkToFetch = `https://api.themoviedb.org/3/person/${ctx.query.id}?api_key=${API_KEY}`;
    const response = await fetch(linkToFetch);
    const result = await response.json();

    return {
      props: {
        personFromProps: result,
      },
    };
  } catch (error) {
    return {
      props: {
        personFromProps: null,
      },
    };
  }
};

export default Person;
