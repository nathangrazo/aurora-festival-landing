export const FESTIVAL_DATE = new Date("2027-03-19T16:00:00-03:00");

export const DAYS = [
  { id: "sex", label: "Sexta", date: "19.03" },
  { id: "sab", label: "Sábado", date: "20.03" },
  { id: "dom", label: "Domingo", date: "21.03" },
] as const;

export type DayId = (typeof DAYS)[number]["id"];

export type Artist = {
  name: string;
  genre: string;
  day: DayId;
  hue: number;
  headliner?: boolean;
};

// Todos os nomes são inventados.
export const ARTISTS: Artist[] = [
  { name: "Lua Vermelha", genre: "Indie rock", day: "sex", hue: 350, headliner: true },
  { name: "Os Satélites", genre: "Psicodelia", day: "sex", hue: 265 },
  { name: "Marina Sal", genre: "MPB eletrônica", day: "sex", hue: 190 },
  { name: "DJ Pitanga", genre: "Funk / house", day: "sex", hue: 15 },
  { name: "Neon Tropical", genre: "Synthpop", day: "sab", hue: 300, headliner: true },
  { name: "Kaiô", genre: "Rap", day: "sab", hue: 40 },
  { name: "Coral Elétrico", genre: "Afrobeat", day: "sab", hue: 160 },
  { name: "Tainá Ruiz", genre: "Pop", day: "sab", hue: 325 },
  { name: "Baile Orbital", genre: "Techno", day: "dom", hue: 230, headliner: true },
  { name: "Maré Alta", genre: "Reggae", day: "dom", hue: 140 },
  { name: "Ventania", genre: "Pós-rock", day: "dom", hue: 210 },
  { name: "Mel Sintético", genre: "R&B", day: "dom", hue: 30 },
];

export const STAGES = ["Palco Aurora", "Palco Represa", "Tenda Orbital"] as const;

export type Slot = { time: string; artist: string; stage: (typeof STAGES)[number] };

export const SCHEDULE: Record<DayId, Slot[]> = {
  sex: [
    { time: "16:30", artist: "DJ Pitanga", stage: "Tenda Orbital" },
    { time: "18:00", artist: "Marina Sal", stage: "Palco Represa" },
    { time: "20:00", artist: "Os Satélites", stage: "Palco Aurora" },
    { time: "22:30", artist: "Lua Vermelha", stage: "Palco Aurora" },
  ],
  sab: [
    { time: "15:00", artist: "Coral Elétrico", stage: "Palco Represa" },
    { time: "17:30", artist: "Tainá Ruiz", stage: "Palco Aurora" },
    { time: "20:00", artist: "Kaiô", stage: "Palco Represa" },
    { time: "22:45", artist: "Neon Tropical", stage: "Palco Aurora" },
  ],
  dom: [
    { time: "14:00", artist: "Maré Alta", stage: "Palco Represa" },
    { time: "16:30", artist: "Mel Sintético", stage: "Palco Aurora" },
    { time: "19:00", artist: "Ventania", stage: "Palco Represa" },
    { time: "23:00", artist: "Baile Orbital", stage: "Tenda Orbital" },
  ],
};

export const EXPERIENCES = [
  { title: "Pôr do sol na represa", text: "Deck flutuante com DJ sets acústicos entre 17h e 19h.", color: "amber" },
  { title: "Tenda Orbital", text: "Domo de 360° com projeções que reagem ao som.", color: "violet" },
  { title: "Feira de vinil", text: "Selos independentes, troca de discos e audição ao vivo.", color: "rose" },
  { title: "Comer bem", text: "Trinta cozinhas locais, opções veganas e água de graça.", color: "mint" },
  { title: "Camping", text: "Área com chuveiro quente, carregadores e silêncio depois das 4h.", color: "violet" },
] as const;

export type Ticket = {
  id: string;
  name: string;
  price: number;
  perks: string[];
  featured?: boolean;
};

export const TICKETS: Ticket[] = [
  { id: "dia", name: "Um dia", price: 290, perks: ["Acesso a um dia à escolha", "Todos os palcos", "Água grátis"] },
  {
    id: "passaporte",
    name: "Passaporte",
    price: 690,
    perks: ["Os três dias", "Fila expressa", "Pulseira cashless com R$ 50", "Copo colecionável"],
    featured: true,
  },
  { id: "camping", name: "Passaporte + camping", price: 890, perks: ["Os três dias", "Barraca montada", "Café da manhã", "Armário com tomada"] },
];

export const FAQ = [
  { q: "Qual a idade mínima?", a: "16 anos desacompanhado. Menores de 16 entram com responsável legal e documento com foto." },
  { q: "Posso levar comida?", a: "Lanches lacrados e garrafa de água vazia sim. Vidro, latas e bebida alcoólica não." },
  { q: "Como chegar?", a: "Teremos ônibus saindo do metrô Santo Amaro a cada 15 minutos e estacionamento com vagas limitadas." },
  { q: "E se chover?", a: "O festival acontece com chuva. Só paramos em caso de raios, seguindo o protocolo da Defesa Civil." },
  { q: "Meia-entrada?", a: "Sim, para estudantes, idosos, PCD e professores da rede pública, com comprovação na entrada." },
];
