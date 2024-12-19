import { Link } from 'react-router-dom';

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  linkedin?: string;
}

export function Equipe() {
  const teamMembers: TeamMember[] = [
    {
      name: "Guillaume Roger",
      role: "Co-fondateur & CEO",
      bio: "Expert en modélisation agricole et développement durable. Diplômé de l'École Polytechnique et d'AgroParisTech. Spécialiste des systèmes agricoles durables et de l'innovation dans l'agriculture.",
      image: "/images/team/guillaume-roger.jpg",
      linkedin: "https://www.linkedin.com/in/guillaume-roger-agriculture/",
    },
    {
      name: "David Djaïz",
      role: "Président",
      bio: "Haut fonctionnaire, essayiste et enseignant à Sciences Po. Ancien élève de l'École normale supérieure et de l'ENA. Auteur de plusieurs ouvrages sur l'économie et la société, dont 'Slow Démocratie' et 'Le nouveau modèle français'.",
      image: "/images/team/david-djaiz.jpg",
      linkedin: "https://www.linkedin.com/in/david-djaiz/",
    },
    {
      name: "Régis Dubourg",
      role: "Co-fondateur & Chief Agriculture Officer",
      bio: "Ingénieur agronome de formation, ancien directeur de l'ACTA. Expert reconnu dans le domaine de l'innovation agricole et de la transition agroécologique. Plus de 20 ans d'expérience dans le secteur agricole.",
      image: "/images/team/regis-dubourg.jpg",
      linkedin: "https://www.linkedin.com/in/régis-dubourg/",
    },
    {
      name: "Elisha Sore",
      role: "Co-fondateur & Chief Product Officer",
      bio: "Expert en développement de produits et en expérience utilisateur. Passionné par l'innovation technologique au service de l'agriculture durable. Spécialiste en solutions numériques pour l'agriculture de précision.",
      image: "/images/team/elisha-sore.jpg",
      linkedin: "https://www.linkedin.com/in/elisha-sore/",
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero section */}
      <div className="relative isolate pt-24">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-[#004D40] sm:text-6xl">
              Notre Équipe
            </h1>
            <p className="mt-6 text-lg leading-8 text-[#004D40]">
              Une équipe pluridisciplinaire dédiée à la transformation de l'agriculture française.
            </p>
          </div>
        </div>
      </div>

      {/* Team section */}
      <div className="mx-auto max-w-7xl px-6 pb-24 lg:px-8">
        <div className="mx-auto">
          {/* President Profile */}
          <div className="mb-20 flex justify-center">
            <div className="max-w-2xl">
              <div className="group relative">
                <div className="aspect-[16/9] w-full overflow-hidden rounded-2xl bg-gray-50 shadow-xl">
                  <img
                    className="h-full w-full object-cover"
                    src="/images/team/david-djaiz.jpg"
                    alt="David Djaïz"
                  />
                </div>
                <div className="mt-6 text-center">
                  <h3 className="text-2xl font-semibold leading-7 tracking-tight text-[#004D40]">
                    David Djaïz
                  </h3>
                  <p className="text-xl font-semibold leading-6 text-[#004D40]">Président</p>
                  <p className="mt-4 text-base leading-6 text-gray-600 max-w-2xl mx-auto">
                    Haut fonctionnaire, essayiste et enseignant à Sciences Po. Ancien élève de l'École normale supérieure et de l'ENA. Auteur de plusieurs ouvrages sur l'économie et la société, dont 'Slow Démocratie' et 'Le nouveau modèle français'.
                  </p>
                  <a
                    href="https://www.linkedin.com/in/david-djaiz/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center text-[#004D40] hover:text-[#003D33]"
                  >
                    <span className="text-sm">LinkedIn</span>
                    <svg
                      className="ml-2 h-4 w-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Other Team Members */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {teamMembers
              .filter(member => member.name !== "David Djaïz")
              .map((member) => (
                <div key={member.name} className="group relative">
                  <div className="aspect-[3/4] w-full overflow-hidden rounded-2xl bg-gray-50 shadow-xl">
                    <img
                      className="h-full w-full object-cover"
                      src={member.image}
                      alt={member.name}
                    />
                  </div>
                  <div className="mt-4">
                    <h3 className="text-lg font-semibold leading-7 tracking-tight text-[#004D40]">
                      {member.name}
                    </h3>
                    <p className="text-base font-semibold leading-6 text-[#004D40]">{member.role}</p>
                    <p className="mt-2 text-sm leading-6 text-gray-600">{member.bio}</p>
                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-flex items-center text-[#004D40] hover:text-[#003D33]"
                      >
                        <span className="text-sm">LinkedIn</span>
                        <svg
                          className="ml-2 h-4 w-4"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
