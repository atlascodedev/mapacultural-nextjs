import {
  IAgentModel,
  ICulturalSpaceModel,
  IEventModel,
} from "../@types/project";

const mockAgents: Array<IAgentModel & { lat: string; lng: string }> = [
  {
    agentType: "Pessoa física",
    birthday_or_founding: new Date().toJSON(),
    categories: ["Artes visuais", "Artesanato", "Museu"],
    cep: "95600-000",
    lat: "-29.652355",
    lng: "-50.764123",
    cpf_or_cnpj: "010.938.680-90",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates aspernatur dolore quam neque eos, delectus cupiditate incidunt animi et similique maxime dolor tenetur omnis, eum amet harum numquam exercitationem. Omnis aliquam, dolor quisquam alias distinctio similique iusto at repellendus placeat fuga facilis accusantium laboriosam laudantium voluptatum nobis. At aspernatur illo iste iure corrupti, repellat quos distinctio aliquid voluptas, vero officiis libero et repudiandae harum, enim autem. Maiores accusamus aliquam, ut eius quod consequuntur animi reiciendis, cumque impedit dolore, alias iusto incidunt fuga molestiae! Praesentium, eos. Maiores eaque corrupti error assumenda provident eligendi quo unde, possimus temporibus, quis saepe? Aperiam optio ex ab provident, molestias at totam quae, unde pariatur vero sint numquam neque? Consequuntur voluptates, iure nostrum quam perspiciatis tempora, ipsam, eligendi id asperiores corporis molestiae dolore exercitationem! Facere soluta, adipisci molestiae laboriosam earum id nam? Velit sit alias deleniti! Consequuntur, corrupti sit cum, at voluptate iure aut quasi asperiores quos, voluptates commodi quaerat autem. Maiores eaque et deserunt animi, perferendis minus, reprehenderit optio fugiat accusamus, voluptatem fuga esse quod ratione blanditiis cupiditate recusandae magnam illo veritatis facilis. Quibusdam numquam repellendus laboriosam maxime magnam! Laboriosam, doloribus iusto cupiditate harum sint voluptas dolore ullam nostrum unde voluptatibus libero, eum quibusdam similique sequi, perferendis nobis aspernatur tempora. Unde facere vero distinctio ipsum saepe officiis sed, aliquid perferendis quo cupiditate, dolorem ea accusantium at nemo culpa fuga aspernatur? Placeat laudantium, facere iure aliquam doloremque, voluptate accusantium, delectus molestias perspiciatis explicabo dolorum vel quam similique a illo adipisci necessitatibus aperiam rem nulla neque nostrum.",
    fullName: "Aleksander Mirowksy",
    gender: "Homem",
    neighborhood: "Centro",
    phoneNumber: "51988773394",
    professionalRecord: "",
    publicEmail: "alex.xande10@gmail.com",
    publicName: "Aleks",
    race: "Branca",
    registrationEmail: "alex.xande100@gmail.com",
    street: "Logradouro 1",
    streetNumber: "503",
    complement: "complemento",
    facebook: "https://facebook.com/aleks_taquara",
    instagram: "https://instagram/aleks_taquara",
    portfolio: "",
    publicPhoneNumber: "51987743434",
    website: "https://atlascode.dev",
  },
];

const mockCulturalSpaces: Array<
  ICulturalSpaceModel & { lat: string; lng: string }
> = [
  {
    accessibilityType: [
      "Banheiros adaptados",
      "Bebedouro adaptado",
      "Cadeira de rodas para uso do visitante",
    ],
    accessible: "Não",
    category: ["Artes visuais", "Música", "Dança"],
    cep: "985585",
    closingHours: "closing hours today",
    cpf_or_cpnj: "01083432434",
    culturalSpaceCapacity: "50 pessoas",
    culturalSpaceEntry: "Espaço privado",
    culturalSpaceHead: "Alexandre",
    culturalSpaceName: "Espaço Cultural 1",
    culturalSpaceSphere: "Coletivo",
    description:
      "  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corrupti reprehenderit quidem omnis minima nulla rem sint pariatur, voluptatem eum amet saepe animi fugit officiis officia ipsa, eius iusto inventore. Autem!",
    entryTypes: "Acesso pago",
    lat: "-29.65130604649294",
    lng: " -50.768371620612314",
    neighborhood: "Empresa",
    openingHours: "opening hours",
    privateEmail: "alex.xande100@gmail.com",
    privatePhone: "51942424",
    publicEmail: "alex.xande10000@gmail.com",
    street: "Logradoouro 23",
    streetNumber: "51323",
    complement: "Sem complemento",
    entryFee: "40 reais",
  },
];
