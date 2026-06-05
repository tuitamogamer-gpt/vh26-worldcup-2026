import type { Player } from '../types'

// Squads for the 2026 FIFA World Cup (call-up lists as of June 2026).
// Compiled from public sources; final 26-man lists are confirmed by FIFA at tournament start.
const p = (name: string, pos: Player['pos'], club: string, captain = false): Player =>
  captain ? { name, pos, club, captain } : { name, pos, club }

export const squads: Record<string, Player[]> = {
  // ---------------- Group A ----------------
  MEX: [
    p('Raúl Rangel', 'GK', 'Guadalajara'), p('Carlos Acevedo', 'GK', 'Santos Laguna'), p('Guillermo Ochoa', 'GK', 'AEL Limassol'),
    p('Jorge Sánchez', 'DEF', 'PAOK'), p('César Montes', 'DEF', 'Lokomotiv Moscow'), p('Edson Álvarez', 'DEF', 'Fenerbahçe', true),
    p('Johan Vásquez', 'DEF', 'Genoa'), p('Israel Reyes', 'DEF', 'Club América'), p('Mateo Chávez', 'DEF', 'AZ Alkmaar'), p('Jesús Gallardo', 'DEF', 'Toluca'),
    p('Érik Lira', 'MID', 'Cruz Azul'), p('Luis Romo', 'MID', 'Guadalajara'), p('Álvaro Fidalgo', 'MID', 'Real Betis'), p('Orbelín Pineda', 'MID', 'AEK Athens'),
    p('Obed Vargas', 'MID', 'Atlético Madrid'), p('Gilberto Mora', 'MID', 'Tijuana'), p('Luis Chávez', 'MID', 'Dynamo Moscow'), p('Brian Gutiérrez', 'MID', 'Guadalajara'),
    p('Raúl Jiménez', 'FWD', 'Fulham'), p('Alexis Vega', 'FWD', 'Toluca'), p('Santiago Giménez', 'FWD', 'AC Milan'), p('Armando González', 'FWD', 'Guadalajara'),
    p('Julián Quiñones', 'FWD', 'Al-Qadsiah'), p('César Huerta', 'FWD', 'Anderlecht'), p('Roberto Alvarado', 'FWD', 'Guadalajara'),
  ],
  RSA: [
    p('Ronwen Williams', 'GK', 'Mamelodi Sundowns', true), p('Sipho Chaine', 'GK', 'Orlando Pirates'), p('Ricardo Goss', 'GK', 'Siwelele'),
    p('Thabang Matuludi', 'DEF', 'Polokwane City'), p('Khulumani Ndamane', 'DEF', 'Mamelodi Sundowns'), p('Aubrey Modiba', 'DEF', 'Mamelodi Sundowns'),
    p('Mbekezeli Mbokazi', 'DEF', 'Chicago Fire FC'), p('Samukele Kabini', 'DEF', 'Molde'), p('Nkosinathi Sibisi', 'DEF', 'Orlando Pirates'),
    p('Khuliso Mudau', 'DEF', 'Mamelodi Sundowns'), p('Ime Okon', 'DEF', 'Hannover 96'), p('Olwethu Makhanya', 'DEF', 'Philadelphia Union'), p('Bradley Cross', 'DEF', 'Kaizer Chiefs'),
    p('Teboho Mokoena', 'MID', 'Mamelodi Sundowns'), p('Thalente Mbatha', 'MID', 'Orlando Pirates'), p('Themba Zwane', 'MID', 'Mamelodi Sundowns'),
    p('Sphephelo Sithole', 'MID', 'Tondela'), p('Jayden Adams', 'MID', 'Mamelodi Sundowns'),
    p('Oswin Appollis', 'FWD', 'Orlando Pirates'), p('Tshepang Moremi', 'FWD', 'Orlando Pirates'), p('Lyle Foster', 'FWD', 'Burnley'),
    p('Relebohile Mofokeng', 'FWD', 'Orlando Pirates'), p('Thapelo Maseko', 'FWD', 'AEL Limassol'), p('Iqraam Rayners', 'FWD', 'Mamelodi Sundowns'),
    p('Evidence Makgopa', 'FWD', 'Orlando Pirates'), p('Kamogelo Sebelebele', 'FWD', 'Orlando Pirates'),
  ],
  KOR: [
    p('Kim Seung-gyu', 'GK', 'FC Tokyo'), p('Song Bum-keun', 'GK', 'Jeonbuk Hyundai Motors'), p('Jo Hyeon-woo', 'GK', 'Ulsan HD'),
    p('Lee Han-beom', 'DEF', 'FC Midtjylland'), p('Kim Min-jae', 'DEF', 'Bayern Munich'), p('Kim Tae-hyeon', 'DEF', 'Kashima Antlers'),
    p('Lee Tae-seok', 'DEF', 'Austria Wien'), p('Cho Wi-je', 'DEF', 'Jeonbuk Hyundai Motors'), p('Kim Moon-hwan', 'DEF', 'Daejeon Hana Citizen'),
    p('Park Jin-seob', 'DEF', 'Zhejiang Professional'), p('Seol Young-woo', 'DEF', 'Red Star Belgrade'), p('Jens Castrop', 'DEF', 'Borussia Mönchengladbach'),
    p('Lee Gi-hyuk', 'MID', 'Gangwon FC'), p('Hwang In-beom', 'MID', 'Feyenoord'), p('Paik Seung-ho', 'MID', 'Birmingham City'), p('Lee Jae-sung', 'MID', 'Mainz 05'),
    p('Hwang Hee-chan', 'MID', 'Wolverhampton Wanderers'), p('Bae Jun-ho', 'MID', 'Stoke City'), p('Lee Kang-in', 'MID', 'Paris Saint-Germain'), p('Yang Hyun-jun', 'MID', 'Celtic'),
    p('Kim Jin-gyu', 'MID', 'Jeonbuk Hyundai Motors'), p('Eom Ji-sung', 'MID', 'Swansea City'), p('Lee Dong-gyeong', 'MID', 'Ulsan HD'),
    p('Son Heung-min', 'FWD', 'Los Angeles FC', true), p('Cho Gue-sung', 'FWD', 'FC Midtjylland'), p('Oh Hyeon-gyu', 'FWD', 'Beşiktaş'),
  ],
  CZE: [
    p('Matěj Kovář', 'GK', 'PSV Eindhoven'), p('Jindřich Staněk', 'GK', 'Slavia Prague'), p('Lukáš Horníček', 'GK', 'Braga'),
    p('David Zima', 'DEF', 'Slavia Prague'), p('Tomáš Holeš', 'DEF', 'Slavia Prague'), p('Robin Hranáč', 'DEF', 'TSG Hoffenheim'), p('Vladimír Coufal', 'DEF', 'TSG Hoffenheim'),
    p('Štěpán Chaloupek', 'DEF', 'Slavia Prague'), p('Ladislav Krejčí', 'DEF', 'Wolverhampton Wanderers', true), p('David Jurásek', 'DEF', 'Slavia Prague'),
    p('Jaroslav Zelený', 'DEF', 'Sparta Prague'), p('David Douděra', 'DEF', 'Slavia Prague'),
    p('Vladimír Darida', 'MID', 'Hradec Králové'), p('Lukáš Červ', 'MID', 'Viktoria Plzeň'), p('Lukáš Provod', 'MID', 'Slavia Prague'), p('Michal Sadílek', 'MID', 'Slavia Prague'),
    p('Tomáš Souček', 'MID', 'West Ham United'), p('Alexandr Sojka', 'MID', 'Viktoria Plzeň'), p('Hugo Sochůrek', 'MID', 'Sparta Prague'),
    p('Adam Hložek', 'FWD', 'TSG Hoffenheim'), p('Patrik Schick', 'FWD', 'Bayer Leverkusen'), p('Jan Kuchta', 'FWD', 'Sparta Prague'), p('Mojmír Chytil', 'FWD', 'Slavia Prague'),
    p('Pavel Šulc', 'FWD', 'Lyon'), p('Tomáš Chorý', 'FWD', 'Viktoria Plzeň'), p('Denis Višinský', 'FWD', 'Viktoria Plzeň'),
  ],

  // ---------------- Group B ----------------
  CAN: [
    p('Dayne St. Clair', 'GK', 'Inter Miami CF'), p('Maxime Crépeau', 'GK', 'Orlando City SC'), p('Owen Goodman', 'GK', 'Barnsley'),
    p('Alistair Johnston', 'DEF', 'Celtic'), p('Alfie Jones', 'DEF', 'Middlesbrough'), p('Luc de Fougerolles', 'DEF', 'Dender'), p('Joel Waterman', 'DEF', 'Chicago Fire FC'),
    p('Derek Cornelius', 'DEF', 'Rangers'), p('Moïse Bombito', 'DEF', 'Nice'), p('Alphonso Davies', 'DEF', 'Bayern Munich', true), p('Richie Laryea', 'DEF', 'Toronto FC'), p('Niko Sigur', 'DEF', 'Hajduk Split'),
    p('Mathieu Choinière', 'MID', 'Los Angeles FC'), p('Stephen Eustáquio', 'MID', 'Los Angeles FC'), p('Ismaël Koné', 'MID', 'Sassuolo'), p('Liam Millar', 'MID', 'Hull City'),
    p('Jacob Shaffelburg', 'MID', 'Los Angeles FC'), p('Tajon Buchanan', 'MID', 'Villarreal'), p('Ali Ahmed', 'MID', 'Norwich City'), p('Jonathan Osorio', 'MID', 'Toronto FC'),
    p('Nathan Saliba', 'MID', 'Anderlecht'), p('Marcelo Flores', 'MID', 'Tigres UANL'),
    p('Jonathan David', 'FWD', 'Juventus'), p('Cyle Larin', 'FWD', 'Southampton'), p('Promise David', 'FWD', 'Union Saint-Gilloise'), p('Tani Oluwaseyi', 'FWD', 'Villarreal'),
  ],
  SUI: [
    p('Gregor Kobel', 'GK', 'Borussia Dortmund'), p('Yvon Mvogo', 'GK', 'Lorient'), p('Marvin Keller', 'GK', 'Young Boys'),
    p('Miro Muheim', 'DEF', 'Hamburger SV'), p('Silvan Widmer', 'DEF', 'Mainz 05'), p('Nico Elvedi', 'DEF', 'Borussia Mönchengladbach'), p('Manuel Akanji', 'DEF', 'Inter Milan'),
    p('Ricardo Rodríguez', 'DEF', 'Real Betis'), p('Eray Cömert', 'DEF', 'Valencia'), p('Aurèle Amenda', 'DEF', 'Eintracht Frankfurt'), p('Luca Jaquez', 'DEF', 'Stuttgart'),
    p('Granit Xhaka', 'MID', 'Sunderland', true), p('Remo Freuler', 'MID', 'Bologna'), p('Denis Zakaria', 'MID', 'Monaco'), p('Djibril Sow', 'MID', 'Sevilla'),
    p('Michel Aebischer', 'MID', 'Pisa'), p('Fabian Rieder', 'MID', 'Augsburg'), p('Ardon Jashari', 'MID', 'AC Milan'), p('Johan Manzambi', 'MID', 'SC Freiburg'),
    p('Breel Embolo', 'FWD', 'Rennes'), p('Dan Ndoye', 'FWD', 'Nottingham Forest'), p('Rubén Vargas', 'FWD', 'Sevilla'), p('Noah Okafor', 'FWD', 'Leeds United'),
    p('Zeki Amdouni', 'FWD', 'Burnley'), p('Christian Fassnacht', 'FWD', 'Young Boys'), p('Cedric Itten', 'FWD', 'Fortuna Düsseldorf'),
  ],
  QAT: [
    p('Meshaal Barsham', 'GK', 'Al-Sadd SC'), p('Mahmoud Abunada', 'GK', 'Al-Rayyan SC'), p('Salah Zakaria', 'GK', 'Al-Duhail SC'),
    p('Pedro Miguel', 'DEF', 'Al-Sadd SC'), p('Lucas Mendes', 'DEF', 'Al-Wakrah SC'), p('Boualem Khoukhi', 'DEF', 'Al-Sadd SC'), p('Sultan Al Brake', 'DEF', 'Al-Duhail SC'),
    p('Issa Laye', 'DEF', 'Al-Arabi SC'), p('Ayoub Al Aloui', 'DEF', 'Al-Gharafa SC'), p('Homam Ahmed', 'DEF', 'Cultural Leonesa'), p('Al Hashmi Al Hussein', 'DEF', 'Al-Arabi SC'),
    p('Assim Madibo', 'MID', 'Al-Wakrah SC'), p('Abdulaziz Hatem', 'MID', 'Al-Rayyan SC'), p('Karim Boudiaf', 'MID', 'Al-Duhail SC'), p('Ahmed Fathi', 'MID', 'Al-Arabi SC'),
    p('Jassem Gaber', 'MID', 'Al-Rayyan SC'), p('Mohamed Al Mannai', 'MID', 'Al-Shamal SC'),
    p('Hassan Al-Haydos', 'FWD', 'Al-Sadd SC', true), p('Akram Afif', 'FWD', 'Al-Sadd SC'), p('Almoez Ali', 'FWD', 'Al-Duhail SC'), p('Edmilson Junior', 'FWD', 'Al-Duhail SC'),
    p('Mohammed Muntari', 'FWD', 'Al-Gharafa SC'), p('Ahmed Alaaeldin', 'FWD', 'Al-Rayyan SC'), p('Yusuf Abdurisag', 'FWD', 'Al-Wakrah SC'), p('Tahseen Mohammed', 'FWD', 'Al-Duhail SC'),
  ],
  BIH: [
    p('Nikola Vasilj', 'GK', 'FC St. Pauli'), p('Mladen Jurkas', 'GK', 'FK Borac Banja Luka'), p('Martin Zlomislić', 'GK', 'HNK Rijeka'),
    p('Sead Kolašinac', 'DEF', 'Atalanta'), p('Amar Dedić', 'DEF', 'Benfica'), p('Nihad Mujakić', 'DEF', 'Gaziantep FK'), p('Dennis Hadžikadunić', 'DEF', 'Sampdoria'),
    p('Tarik Muharemović', 'DEF', 'Sassuolo'), p('Nikola Katić', 'DEF', 'FC Schalke 04'), p('Stjepan Radeljić', 'DEF', 'HNK Rijeka'), p('Nidal Ćelik', 'DEF', 'RC Lens'),
    p('Benjamin Tahirović', 'MID', 'Brøndby'), p('Armin Gigović', 'MID', 'Young Boys'), p('Ivan Bašić', 'MID', 'FC Astana'), p('Ivan Šunjić', 'MID', 'Pafos FC'),
    p('Amar Memić', 'MID', 'Viktoria Plzeň'), p('Amir Hadžiahmetović', 'MID', 'Hull City'), p('Dženis Burnić', 'MID', 'Karlsruher SC'), p('Ermin Mahmić', 'MID', 'Slovan Liberec'),
    p('Edin Džeko', 'FWD', 'FC Schalke 04', true), p('Ermedin Demirović', 'FWD', 'VfB Stuttgart'), p('Samed Baždar', 'FWD', 'Jagiellonia Białystok'),
    p('Kerim Alajbegović', 'FWD', 'Red Bull Salzburg'), p('Esmir Bajraktarević', 'FWD', 'PSV Eindhoven'), p('Haris Tabaković', 'FWD', 'Borussia Mönchengladbach'), p('Jovo Lukić', 'FWD', 'Universitatea Cluj'),
  ],

  // ---------------- Group C ----------------
  BRA: [
    p('Alisson', 'GK', 'Liverpool'), p('Ederson', 'GK', 'Fenerbahçe'), p('Weverton', 'GK', 'Grêmio'),
    p('Marquinhos', 'DEF', 'Paris Saint-Germain', true), p('Gabriel Magalhães', 'DEF', 'Arsenal'), p('Bremer', 'DEF', 'Juventus'), p('Danilo', 'DEF', 'Flamengo'),
    p('Alex Sandro', 'DEF', 'Flamengo'), p('Roger Ibañez', 'DEF', 'Al-Ahli'), p('Léo Pereira', 'DEF', 'Flamengo'), p('Wesley', 'DEF', 'Roma'), p('Douglas Santos', 'DEF', 'Zenit'),
    p('Bruno Guimarães', 'MID', 'Newcastle United'), p('Casemiro', 'MID', 'Manchester United'), p('Lucas Paquetá', 'MID', 'Flamengo'), p('Danilo Santos', 'MID', 'Botafogo'), p('Fabinho', 'MID', 'Al-Ittihad'),
    p('Neymar', 'FWD', 'Santos'), p('Vinícius Júnior', 'FWD', 'Real Madrid'), p('Raphinha', 'FWD', 'Barcelona'), p('Matheus Cunha', 'FWD', 'Manchester United'),
    p('Gabriel Martinelli', 'FWD', 'Arsenal'), p('Luiz Henrique', 'FWD', 'Zenit'), p('Endrick', 'FWD', 'Lyon'), p('Igor Thiago', 'FWD', 'Brentford'), p('Rayan', 'FWD', 'Bournemouth'),
  ],
  MAR: [
    p('Yassine Bounou', 'GK', 'Al-Hilal'), p('Munir El Kajoui', 'GK', 'RS Berkane'), p('Reda Tagnaouti', 'GK', 'AS FAR'),
    p('Achraf Hakimi', 'DEF', 'Paris Saint-Germain', true), p('Noussair Mazraoui', 'DEF', 'Manchester United'), p('Nayef Aguerd', 'DEF', 'Marseille'), p('Chadi Riad', 'DEF', 'Crystal Palace'),
    p('Issa Diop', 'DEF', 'Fulham'), p('Anass Salah-Eddine', 'DEF', 'PSV'), p('Zakaria El Ouahdi', 'DEF', 'Genk'), p('Youssef Belammari', 'DEF', 'Al Ahly'), p('Redouane Halhal', 'DEF', 'Mechelen'),
    p('Sofyan Amrabat', 'MID', 'Real Betis'), p('Azzedine Ounahi', 'MID', 'Girona'), p('Bilal El Khannouss', 'MID', 'VfB Stuttgart'), p('Ismael Saibari', 'MID', 'PSV'),
    p('Neil El Aynaoui', 'MID', 'Roma'), p('Ayyoub Bouaddi', 'MID', 'Lille'),
    p('Brahim Díaz', 'FWD', 'Real Madrid'), p('Ayoub El Kaabi', 'FWD', 'Olympiacos'), p('Abde Ezzalzouli', 'FWD', 'Real Betis'), p('Soufiane Rahimi', 'FWD', 'Al Ain'),
    p('Chemsdine Talbi', 'FWD', 'Sunderland'), p('Gessime Yassine', 'FWD', 'Strasbourg'), p('Ayoube Amaimouni', 'FWD', 'Eintracht Frankfurt'),
  ],
  HAI: [
    p('Johny Placide', 'GK', 'Free agent'), p('Alexandre Pierre', 'GK', 'Cavalier SC'), p('Josue Duverger', 'GK', 'Real Esppor Club'),
    p('Carlens Arcus', 'DEF', 'Le Havre'), p('Wilguens Paugain', 'DEF', 'Real Salt Lake'), p('Duke Lacroix', 'DEF', 'Atlanta United'), p('Martin Experience', 'DEF', 'Violette AC'),
    p('Jean-Kévin Duverne', 'DEF', 'Brest'), p('Ricardo Adé', 'DEF', 'Bnei Sakhnin'), p('Hannes Delcroix', 'DEF', 'Burnley'), p('Keeto Thermoncy', 'DEF', 'Arcahaie FC'),
    p('Danley Jean Jacques', 'MID', 'Lorient'), p('Jean-Ricner Bellegarde', 'MID', 'Wolverhampton Wanderers'), p('Carl Fred Sainte', 'MID', 'Cavalier SC'), p('Leverton Pierre', 'MID', 'Violette AC'),
    p('Woodensky Pierre', 'MID', 'Violette AC'), p('Dominique Simon', 'MID', 'Real Esppor Club'),
    p('Duckens Nazon', 'FWD', 'Al-Tadhamon SC', true), p('Frantzdy Pierrot', 'FWD', 'Gaziantep FK'), p('Wilson Isidor', 'FWD', 'Sunderland'), p('Derrick Etienne Jr.', 'FWD', 'FC Cincinnati'),
    p('Don Deedson Louicius', 'FWD', 'Famalicão'), p('Josué Casimir', 'FWD', 'Pyramids FC'), p('Ruben Providence', 'FWD', 'Sparta Rotterdam'), p('Lenny Joseph', 'FWD', 'Bordeaux'),
  ],
  SCO: [
    p('Angus Gunn', 'GK', 'Nottingham Forest'), p('Craig Gordon', 'GK', 'Hearts'), p('Liam Kelly', 'GK', 'Rangers'),
    p('Andy Robertson', 'DEF', 'Liverpool', true), p('Kieran Tierney', 'DEF', 'Celtic'), p('Jack Hendry', 'DEF', 'Al Ettifaq'), p('Grant Hanley', 'DEF', 'Hibernian'),
    p('Aaron Hickey', 'DEF', 'Brentford'), p('Nathan Patterson', 'DEF', 'Everton'), p('Anthony Ralston', 'DEF', 'Celtic'), p('John Souttar', 'DEF', 'Rangers'),
    p('Scott McKenna', 'DEF', 'Dinamo Zagreb'), p('Dom Hyam', 'DEF', 'Wrexham'),
    p('Scott McTominay', 'MID', 'Napoli'), p('Billy Gilmour', 'MID', 'Napoli'), p('John McGinn', 'MID', 'Aston Villa'), p('Ryan Christie', 'MID', 'Bournemouth'),
    p('Lewis Ferguson', 'MID', 'Bologna'), p('Kenny McLean', 'MID', 'Norwich City'), p('Ben Gannon-Doak', 'MID', 'Bournemouth'), p('Findlay Curtis', 'MID', 'Kilmarnock'),
    p('Che Adams', 'FWD', 'Torino'), p('Lyndon Dykes', 'FWD', 'Charlton Athletic'), p('George Hirst', 'FWD', 'Ipswich Town'), p('Lawrence Shankland', 'FWD', 'Hearts'), p('Ross Stewart', 'FWD', 'Southampton'),
  ],

  // ---------------- Group D ----------------
  USA: [
    p('Matt Turner', 'GK', 'New England Revolution'), p('Matt Freese', 'GK', 'New York City FC'), p('Chris Brady', 'GK', 'Chicago Fire'),
    p('Sergiño Dest', 'DEF', 'PSV Eindhoven'), p('Antonee Robinson', 'DEF', 'Fulham'), p('Tim Ream', 'DEF', 'Charlotte FC', true), p('Chris Richards', 'DEF', 'Crystal Palace'),
    p('Mark McKenzie', 'DEF', 'Toulouse'), p('Miles Robinson', 'DEF', 'FC Cincinnati'), p('Alex Freeman', 'DEF', 'Villarreal'), p('Max Arfsten', 'DEF', 'Columbus Crew'),
    p('Auston Trusty', 'DEF', 'Celtic'), p('Joe Scally', 'DEF', 'Borussia Mönchengladbach'),
    p('Weston McKennie', 'MID', 'Juventus'), p('Tyler Adams', 'MID', 'AFC Bournemouth'), p('Brenden Aaronson', 'MID', 'Leeds United'), p('Malik Tillman', 'MID', 'Bayer Leverkusen'),
    p('Sebastian Berhalter', 'MID', 'Vancouver Whitecaps'), p('Giovanni Reyna', 'MID', 'Borussia Mönchengladbach'), p('Cristian Roldan', 'MID', 'Seattle Sounders'),
    p('Christian Pulisic', 'FWD', 'AC Milan'), p('Folarin Balogun', 'FWD', 'AS Monaco'), p('Ricardo Pepi', 'FWD', 'PSV Eindhoven'), p('Timothy Weah', 'FWD', 'Olympique de Marseille'),
    p('Haji Wright', 'FWD', 'Coventry City'), p('Alejandro Zendejas', 'FWD', 'Club América'),
  ],
  PAR: [
    p('Roberto Fernández', 'GK', 'Cerro Porteño'), p('Orlando Gill', 'GK', 'San Lorenzo'), p('Gastón Olveira', 'GK', 'Olimpia'),
    p('Gustavo Gómez', 'DEF', 'Palmeiras', true), p('Juan José Cáceres', 'DEF', 'Dynamo Moscow'), p('Gustavo Velázquez', 'DEF', 'Cerro Porteño'), p('Fabián Balbuena', 'DEF', 'Grêmio'),
    p('Júnior Alonso', 'DEF', 'Atlético Mineiro'), p('Omar Alderete', 'DEF', 'Sunderland'), p('José Canale', 'DEF', 'Lanús'), p('Alexandro Maidana', 'DEF', 'Talleres'),
    p('Andrés Cubas', 'MID', 'Vancouver Whitecaps'), p('Damián Bobadilla', 'MID', 'São Paulo'), p('Diego Gómez', 'MID', 'Brighton & Hove Albion'), p('Matías Galarza', 'MID', 'Atlanta United'),
    p('Alejandro Romero Gamarra', 'MID', 'Al Ain'), p('Braian Ojeda', 'MID', 'Orlando City'), p('Mauricio Magalhães', 'MID', 'Palmeiras'),
    p('Miguel Almirón', 'FWD', 'Atlanta United'), p('Julio Enciso', 'FWD', 'Strasbourg'), p('Antonio Sanabria', 'FWD', 'Cremonese'), p('Álex Arce', 'FWD', 'Independiente Rivadavia'),
    p('Ramón Sosa', 'FWD', 'Palmeiras'), p('Gabriel Ávalos', 'FWD', 'Independiente'), p('Isidro Pitta', 'FWD', 'Red Bull Bragantino'), p('Gustavo Caballero', 'FWD', 'Portsmouth'),
  ],
  AUS: [
    p('Mathew Ryan', 'GK', 'Levante', true), p('Paul Izzo', 'GK', 'Randers FC'), p('Patrick Beach', 'GK', 'Melbourne City'),
    p('Aziz Behich', 'DEF', 'Melbourne City'), p('Cameron Burgess', 'DEF', 'Swansea City'), p('Alessandro Circati', 'DEF', 'Parma'), p('Milos Degenek', 'DEF', 'APOEL'),
    p('Jason Geria', 'DEF', 'Albirex Niigata'), p('Jacob Italiano', 'DEF', 'Grazer AK'), p('Paul Okon-Engstler', 'DEF', 'Sydney FC'), p('Harry Souttar', 'DEF', 'Leicester City'),
    p('Jordan Bos', 'MID', 'Feyenoord'), p('Cameron Devlin', 'MID', 'Heart of Midlothian'), p('Lucas Herrington', 'MID', 'Colorado Rapids'), p('Ajdin Hrustic', 'MID', 'Heracles Almelo'),
    p('Jackson Irvine', 'MID', 'FC St. Pauli'), p('Connor Metcalfe', 'MID', 'FC St. Pauli'), p("Aiden O'Neill", 'MID', 'New York City FC'), p('Kai Trewin', 'MID', 'New York City FC'),
    p('Cristian Volpato', 'MID', 'Sassuolo'),
    p('Nestory Irankunda', 'FWD', 'Watford'), p('Mathew Leckie', 'FWD', 'Melbourne City'), p('Awer Mabil', 'FWD', 'CD Castellón'), p('Mohamed Toure', 'FWD', 'Norwich City'),
    p('Nishan Velupillay', 'FWD', 'Melbourne Victory'), p('Tete Yengi', 'FWD', 'FC Machida Zelvia'),
  ],
  TUR: [
    p('Altay Bayındır', 'GK', 'Manchester United'), p('Mert Günok', 'GK', 'Fenerbahçe'), p('Uğurcan Çakır', 'GK', 'Galatasaray'),
    p('Abdülkerim Bardakcı', 'DEF', 'Galatasaray'), p('Eren Elmalı', 'DEF', 'Galatasaray'), p('Çağlar Söyüncü', 'DEF', 'Fenerbahçe'), p('Mert Müldür', 'DEF', 'Fenerbahçe'),
    p('Ferdi Kadıoğlu', 'DEF', 'Brighton & Hove Albion'), p('Merih Demiral', 'DEF', 'Al-Ahli'), p('Ozan Kabak', 'DEF', 'TSG Hoffenheim'), p('Samet Akaydın', 'DEF', 'Çaykur Rizespor'), p('Zeki Çelik', 'DEF', 'AS Roma'),
    p('Hakan Çalhanoğlu', 'MID', 'Inter', true), p('İsmail Yüksek', 'MID', 'Fenerbahçe'), p('Kaan Ayhan', 'MID', 'Galatasaray'), p('Orkun Kökçü', 'MID', 'Beşiktaş'),
    p('Salih Özcan', 'MID', 'Borussia Dortmund'), p('Arda Güler', 'MID', 'Real Madrid'), p('İrfan Can Kahveci', 'MID', 'Fenerbahçe'),
    p('Barış Alper Yılmaz', 'FWD', 'Galatasaray'), p('Yunus Akgün', 'FWD', 'Galatasaray'), p('Can Uzun', 'FWD', 'Eintracht Frankfurt'), p('Deniz Gül', 'FWD', 'Porto'),
    p('Kenan Yıldız', 'FWD', 'Juventus'), p('Kerem Aktürkoğlu', 'FWD', 'Fenerbahçe'), p('Oğuz Aydın', 'FWD', 'Fenerbahçe'),
  ],

  // ---------------- Group E ----------------
  GER: [
    p('Manuel Neuer', 'GK', 'Bayern Munich'), p('Oliver Baumann', 'GK', 'TSG Hoffenheim'), p('Alexander Nübel', 'GK', 'VfB Stuttgart'),
    p('Antonio Rüdiger', 'DEF', 'Real Madrid'), p('Jonathan Tah', 'DEF', 'Bayern Munich'), p('David Raum', 'DEF', 'RB Leipzig'), p('Nico Schlotterbeck', 'DEF', 'Borussia Dortmund'),
    p('Waldemar Anton', 'DEF', 'Borussia Dortmund'), p('Malick Thiaw', 'DEF', 'Newcastle United'), p('Nathaniel Brown', 'DEF', 'Eintracht Frankfurt'), p('Pascal Groß', 'DEF', 'Brighton & Hove Albion'),
    p('Joshua Kimmich', 'MID', 'Bayern Munich', true), p('Felix Nmecha', 'MID', 'Borussia Dortmund'), p('Florian Wirtz', 'MID', 'Liverpool'), p('Jamal Musiala', 'MID', 'Bayern Munich'),
    p('Leon Goretzka', 'MID', 'Bayern Munich'), p('Angelo Stiller', 'MID', 'VfB Stuttgart'), p('Lennart Karl', 'MID', 'Bayern Munich'), p('Nadiem Amiri', 'MID', 'Mainz 05'), p('Aleksandar Pavlović', 'MID', 'Bayern Munich'),
    p('Kai Havertz', 'FWD', 'Arsenal'), p('Leroy Sané', 'FWD', 'Galatasaray'), p('Nick Woltemade', 'FWD', 'Newcastle United'), p('Jamie Leweling', 'FWD', 'VfB Stuttgart'),
    p('Deniz Undav', 'FWD', 'VfB Stuttgart'), p('Maximilian Beier', 'FWD', 'Borussia Dortmund'),
  ],
  CUW: [
    p('Eloy Room', 'GK', 'Miami FC'), p('Tyrick Bodak', 'GK', 'Telstar'), p('Trevor Doornbusch', 'GK', 'VVV-Venlo'),
    p('Shurandy Sambo', 'DEF', 'Sparta Rotterdam'), p('Juriën Gaari', 'DEF', 'Abha'), p('Roshon van Eijma', 'DEF', 'RKC Waalwijk'), p('Sherel Floranus', 'DEF', 'PEC Zwolle'),
    p('Deveron Fonville', 'DEF', 'NEC Nijmegen'), p('Armando Obispo', 'DEF', 'PSV Eindhoven'), p('Joshua Brenet', 'DEF', 'Kayserispor'), p('Riechedly Bazoer', 'DEF', 'Konyaspor'),
    p('Leandro Bacuna', 'MID', 'Iğdır FK', true), p('Juninho Bacuna', 'MID', 'Gaziantep FK'), p('Godfried Roemeratoe', 'MID', 'RKC Waalwijk'), p('Livano Comenencia', 'MID', 'FC Zürich'),
    p("Ar'jany Martha", 'MID', 'Rotherham United'), p('Tyrese Noslin', 'MID', 'Telstar'), p('Kevin Felida', 'MID', 'FC Den Bosch'), p('Tahith Chong', 'MID', 'Sheffield United'),
    p('Jürgen Locadia', 'FWD', 'Miami FC'), p('Jeremy Antonisse', 'FWD', 'Kifisia'), p('Sontje Hansen', 'FWD', 'Middlesbrough'), p('Kenji Gorré', 'FWD', 'Maccabi Haifa'),
    p('Jearl Margaritha', 'FWD', 'Beveren'), p('Brandley Kuwas', 'FWD', 'Volendam'), p('Gervane Kastaneer', 'FWD', 'Terengganu FC'),
  ],
  CIV: [
    p('Yahia Fofana', 'GK', 'Çaykur Rizespor'), p('Mohamed Koné', 'GK', 'Charleroi'), p('Alban Lafont', 'GK', 'Panathinaikos'),
    p('Emmanuel Agbadou', 'DEF', 'Beşiktaş'), p('Christopher Opéri', 'DEF', 'İstanbul Başakşehir'), p('Ousmane Diomande', 'DEF', 'Sporting CP'), p('Guéla Doué', 'DEF', 'Strasbourg'),
    p('Ghislain Konan', 'DEF', 'Gil Vicente'), p('Odilon Kossounou', 'DEF', 'Atalanta'), p('Evan Ndicka', 'DEF', 'AS Roma'), p('Wilfried Singo', 'DEF', 'Galatasaray'),
    p('Seko Fofana', 'MID', 'FC Porto'), p('Parfait Guiagon', 'MID', 'Charleroi'), p('Christ Inao Oulaï', 'MID', 'Trabzonspor'), p('Franck Kessié', 'MID', 'Al-Ahli', true),
    p('Ibrahim Sangaré', 'MID', 'Nottingham Forest'), p('Jean-Michaël Seri', 'MID', 'Maribor'),
    p('Simon Adingra', 'FWD', 'AS Monaco'), p('Ange-Yoan Bonny', 'FWD', 'Inter Milan'), p('Amad Diallo', 'FWD', 'Manchester United'), p('Oumar Diakité', 'FWD', 'Cercle Brugge'),
    p('Yan Diomande', 'FWD', 'RB Leipzig'), p('Evann Guessand', 'FWD', 'Crystal Palace'), p('Nicolas Pépé', 'FWD', 'Villarreal'), p('Bazoumana Touré', 'FWD', 'Hoffenheim'), p('Elye Wahi', 'FWD', 'OGC Nice'),
  ],
  ECU: [
    p('Hernán Galíndez', 'GK', 'Huracán'), p('Moisés Ramírez', 'GK', 'AE Kifisias'), p('Gonzalo Valle', 'GK', 'LDU Quito'),
    p('Willian Pacho', 'DEF', 'Paris Saint-Germain'), p('Piero Hincapié', 'DEF', 'Arsenal'), p('Joel Ordóñez', 'DEF', 'Club Brugge'), p('Félix Torres', 'DEF', 'Internacional'),
    p('Pervis Estupiñán', 'DEF', 'AC Milan'), p('Yaimar Medina', 'DEF', 'KRC Genk'), p('Ángelo Preciado', 'DEF', 'Atlético Mineiro'), p('Jackson Porozo', 'DEF', 'Club Tijuana'),
    p('Moisés Caicedo', 'MID', 'Chelsea'), p('Alan Franco', 'MID', 'Atlético Mineiro'), p('Jordy Alcívar', 'MID', 'Independiente del Valle'), p('Denil Castillo', 'MID', 'FC Midtjylland'),
    p('Pedro Vite', 'MID', 'Pumas UNAM'), p('Alan Minda', 'MID', 'Atlético Mineiro'), p('Kendry Páez', 'MID', 'River Plate'), p('Nilson Angulo', 'MID', 'Sunderland'), p('Gonzalo Plata', 'MID', 'Flamengo'),
    p('Enner Valencia', 'FWD', 'Pachuca', true), p('Kevin Rodríguez', 'FWD', 'Union Saint-Gilloise'), p('Anthony Valencia', 'FWD', 'Royal Antwerp'), p('Jordy Caicedo', 'FWD', 'Huracán'), p('Jeremy Arévalo', 'FWD', 'VfB Stuttgart'),
  ],

  // ---------------- Group F ----------------
  NED: [
    p('Bart Verbruggen', 'GK', 'Brighton & Hove Albion'), p('Mark Flekken', 'GK', 'Bayer Leverkusen'), p('Robin Roefs', 'GK', 'Sunderland'),
    p('Virgil van Dijk', 'DEF', 'Liverpool', true), p('Denzel Dumfries', 'DEF', 'Inter Milan'), p('Nathan Aké', 'DEF', 'Manchester City'), p('Jurriën Timber', 'DEF', 'Arsenal'),
    p('Micky van de Ven', 'DEF', 'Tottenham Hotspur'), p('Jan Paul van Hecke', 'DEF', 'Brighton & Hove Albion'), p('Jorrel Hato', 'DEF', 'Chelsea'),
    p('Mats Wieffer', 'MID', 'Brighton & Hove Albion'), p('Frenkie de Jong', 'MID', 'Barcelona'), p('Marten de Roon', 'MID', 'Atalanta'), p('Tijjani Reijnders', 'MID', 'Manchester City'),
    p('Teun Koopmeiners', 'MID', 'Juventus'), p('Ryan Gravenberch', 'MID', 'Liverpool'), p('Quinten Timber', 'MID', 'Marseille'), p('Guus Til', 'MID', 'PSV Eindhoven'), p('Justin Kluivert', 'MID', 'Bournemouth'),
    p('Memphis Depay', 'FWD', 'Corinthians'), p('Wout Weghorst', 'FWD', 'Ajax'), p('Donyell Malen', 'FWD', 'AS Roma'), p('Cody Gakpo', 'FWD', 'Liverpool'),
    p('Noa Lang', 'FWD', 'Galatasaray'), p('Brian Brobbey', 'FWD', 'Sunderland'), p('Crysencio Summerville', 'FWD', 'West Ham United'),
  ],
  JPN: [
    p('Zion Suzuki', 'GK', 'Parma'), p('Keisuke Osako', 'GK', 'Sanfrecce Hiroshima'), p('Tomoki Hayakawa', 'GK', 'Kashima Antlers'),
    p('Yuto Nagatomo', 'DEF', 'FC Tokyo'), p('Shogo Taniguchi', 'DEF', 'Sint-Truiden'), p('Ko Itakura', 'DEF', 'Ajax'), p('Takehiro Tomiyasu', 'DEF', 'Ajax'),
    p('Tsuyoshi Watanabe', 'DEF', 'Feyenoord'), p('Hiroki Ito', 'DEF', 'Bayern Munich'), p('Ayumu Seko', 'DEF', 'Le Havre'), p('Yukinari Sugawara', 'DEF', 'Werder Bremen'), p('Junnosuke Suzuki', 'DEF', 'FC Copenhagen'),
    p('Wataru Endo', 'MID', 'Liverpool', true), p('Junya Ito', 'MID', 'KRC Genk'), p('Ritsu Doan', 'MID', 'Eintracht Frankfurt'), p('Daichi Kamada', 'MID', 'Crystal Palace'),
    p('Ao Tanaka', 'MID', 'Leeds United'), p('Takefusa Kubo', 'MID', 'Real Sociedad'), p('Keito Nakamura', 'MID', 'Stade de Reims'), p('Kaishu Sano', 'MID', 'Mainz 05'), p('Yuito Suzuki', 'MID', 'SC Freiburg'),
    p('Ayase Ueda', 'FWD', 'Feyenoord'), p('Daizen Maeda', 'FWD', 'Celtic'), p('Koki Ogawa', 'FWD', 'NEC Nijmegen'), p('Keisuke Goto', 'FWD', 'Sint-Truiden'), p('Kento Shiogai', 'FWD', 'VfL Wolfsburg'),
  ],
  TUN: [
    p('Aymen Dahmen', 'GK', 'CS Sfaxien'), p('Sabri Ben Hessen', 'GK', 'Étoile du Sahel'), p('Abdelmouhib Chamakh', 'GK', 'Club Africain'),
    p('Montassar Talbi', 'DEF', 'Lorient'), p('Dylan Bronn', 'DEF', 'Servette'), p('Ali Abdi', 'DEF', 'OGC Nice'), p('Yan Valery', 'DEF', 'Young Boys'),
    p('Mohamed Amine Ben Hamida', 'DEF', 'Espérance de Tunis'), p('Moutaz Neffati', 'DEF', 'IFK Norrköping'), p('Omar Rekik', 'DEF', 'Maribor'), p('Adem Arous', 'DEF', 'Kasımpaşa'), p('Raed Chikhaoui', 'DEF', 'US Monastir'),
    p('Ellyes Skhiri', 'MID', 'Eintracht Frankfurt', true), p('Hannibal Mejbri', 'MID', 'Burnley'), p('Anis Ben Slimane', 'MID', 'Norwich City'), p('Mortadha Ben Ouanes', 'MID', 'Kasımpaşa'),
    p('Ismaël Gharbi', 'MID', 'FC Augsburg'), p('Mohamed Hadj-Mahmoud', 'MID', 'FC Lugano'), p('Rani Khedira', 'MID', 'Union Berlin'),
    p('Elias Achouri', 'FWD', 'FC Copenhagen'), p('Firas Chaouat', 'FWD', 'Club Africain'), p('Hazem Mastouri', 'FWD', 'Dynamo Makhachkala'), p('Elias Saad', 'FWD', 'Hannover 96'),
    p('Sebastian Tounekti', 'FWD', 'Celtic'), p('Khalil Ayari', 'FWD', 'Paris Saint-Germain'), p('Rayan Elloumi', 'FWD', 'Vancouver Whitecaps'),
  ],
  SWE: [
    p('Kristoffer Nordfeldt', 'GK', 'AIK Solna'), p('Viktor Johansson', 'GK', 'Stoke City'), p('Jacob Widell Zetterström', 'GK', 'Derby County'),
    p('Victor Lindelöf', 'DEF', 'Aston Villa', true), p('Hjalmar Ekdal', 'DEF', 'Burnley'), p('Isak Hien', 'DEF', 'Atalanta'), p('Carl Starfelt', 'DEF', 'Celta Vigo'),
    p('Gabriel Gudmundsson', 'DEF', 'Leeds United'), p('Daniel Svensson', 'DEF', 'Borussia Dortmund'), p('Gustaf Lagerbielke', 'DEF', 'SC Braga'), p('Herman Johansson', 'DEF', 'FC Dallas'),
    p('Eric Smith', 'DEF', 'FC St. Pauli'), p('Elliot Stroud', 'DEF', 'Mjällby AIF'),
    p('Mattias Svanberg', 'MID', 'VfL Wolfsburg'), p('Jesper Karlström', 'MID', 'Udinese'), p('Yasin Ayari', 'MID', 'Brighton & Hove Albion'), p('Lucas Bergvall', 'MID', 'Tottenham Hotspur'),
    p('Besfort Zeneli', 'MID', 'Union Saint-Gilloise'), p('Ken Sema', 'MID', 'Pafos FC'),
    p('Viktor Gyökeres', 'FWD', 'Arsenal'), p('Alexander Isak', 'FWD', 'Liverpool'), p('Anthony Elanga', 'FWD', 'Newcastle United'), p('Benjamin Nygren', 'FWD', 'Celtic'),
    p('Gustaf Nilsson', 'FWD', 'Club Brugge'), p('Taha Ali', 'FWD', 'Malmö FF'), p('Alexander Bernhardsson', 'FWD', 'Holstein Kiel'),
  ],

  // ---------------- Group G ----------------
  BEL: [
    p('Thibaut Courtois', 'GK', 'Real Madrid'), p('Senne Lammens', 'GK', 'Manchester United'), p('Mike Penders', 'GK', 'Strasbourg'),
    p('Thomas Meunier', 'DEF', 'Lille'), p('Timothy Castagne', 'DEF', 'Fulham'), p('Arthur Theate', 'DEF', 'Eintracht Frankfurt'), p('Zeno Debast', 'DEF', 'Sporting CP'),
    p('Maxim De Cuyper', 'DEF', 'Brighton & Hove Albion'), p('Brandon Mechele', 'DEF', 'Club Brugge'), p('Koni De Winter', 'DEF', 'AC Milan'), p('Nathan Ngoy', 'DEF', 'Lille'),
    p('Kevin De Bruyne', 'MID', 'Napoli'), p('Axel Witsel', 'MID', 'Girona'), p('Youri Tielemans', 'MID', 'Aston Villa', true), p('Amadou Onana', 'MID', 'Aston Villa'),
    p('Nicolas Raskin', 'MID', 'Rangers'), p('Hans Vanaken', 'MID', 'Club Brugge'),
    p('Romelu Lukaku', 'FWD', 'Napoli'), p('Jérémy Doku', 'FWD', 'Manchester City'), p('Leandro Trossard', 'FWD', 'Arsenal'), p('Dodi Lukebakio', 'FWD', 'Benfica'),
    p('Charles De Ketelaere', 'FWD', 'Atalanta'), p('Alexis Saelemaekers', 'FWD', 'AC Milan'), p('Diego Moreira', 'FWD', 'Strasbourg'), p('Matías Fernández-Pardo', 'FWD', 'Lille'),
  ],
  EGY: [
    p('Mohamed El Shenawy', 'GK', 'Al Ahly'), p('Mostafa Shobeir', 'GK', 'Al Ahly'), p('El Mahdy Soliman', 'GK', 'Zamalek'), p('Mohamed Alaa', 'GK', 'El Gouna'),
    p('Mohamed Hany', 'DEF', 'Al Ahly'), p('Tarek Alaa', 'DEF', 'ZED FC'), p('Hamdy Fathy', 'DEF', 'Al-Wakrah'), p('Ramy Rabia', 'DEF', 'Al Ain'),
    p('Yasser Ibrahim', 'DEF', 'Al Ahly'), p('Hossam Abdelmaguid', 'DEF', 'Zamalek'), p('Mohamed Abdelmonem', 'DEF', 'OGC Nice'), p('Ahmed Fatouh', 'DEF', 'Zamalek'), p('Karim Hafez', 'DEF', 'Pyramids FC'),
    p('Marwan Attia', 'MID', 'Al Ahly'), p('Mohanad Lasheen', 'MID', 'Pyramids FC'), p('Nabil Emad', 'MID', 'Al Najma'), p('Mahmoud Saber', 'MID', 'ZED FC'),
    p('Zizo', 'MID', 'Al Ahly'), p('Trezeguet', 'MID', 'Al Ahly'), p('Emam Ashour', 'MID', 'Al Ahly'), p('Ibrahim Adel', 'MID', 'FC Nordsjælland'), p('Haitham Hassan', 'MID', 'Real Oviedo'),
    p('Mohamed Salah', 'FWD', 'Liverpool', true), p('Omar Marmoush', 'FWD', 'Manchester City'), p('Hamza Abdelkarim', 'FWD', 'Barcelona Atlètic'),
  ],
  IRN: [
    p('Alireza Beiranvand', 'GK', 'Tractor'), p('Hossein Hosseini', 'GK', 'Sepahan'), p('Payam Niazmand', 'GK', 'Persepolis'),
    p('Ehsan Hajsafi', 'DEF', 'Sepahan'), p('Milad Mohammadi', 'DEF', 'Persepolis'), p('Ali Nemati', 'DEF', 'Foolad'), p('Danial Iri', 'DEF', 'Malavan'),
    p('Shojae Khalilzadeh', 'DEF', 'Tractor'), p('Mohammad Hossein Kanaanizadegan', 'DEF', 'Persepolis'), p('Saleh Hardani', 'DEF', 'Esteghlal'), p('Ramin Rezaeian', 'DEF', 'Foolad'),
    p('Alireza Jahanbakhsh', 'MID', 'Dender'), p('Saeid Ezatolahi', 'MID', 'Shabab Al Ahli'), p('Rouzbeh Cheshmi', 'MID', 'Esteghlal'), p('Amirmohammad Razaghnia', 'MID', 'Esteghlal'),
    p('Mohammad Mohebi', 'MID', 'Rostov'), p('Mehdi Ghayedi', 'MID', 'Al Nasr'), p('Saman Ghoddos', 'MID', 'Ittihad Kalba'), p('Mehdi Torabi', 'MID', 'Tractor'),
    p('Mehdi Taremi', 'FWD', 'Olympiacos', true), p('Amirhossein Hosseinzadeh', 'FWD', 'Tractor'), p('Ali Alipour', 'FWD', 'Persepolis'), p('Shahriar Moghanlou', 'FWD', 'Ittihad Kalba'), p('Denis Dargahi', 'FWD', 'Standard Liège'),
  ],
  NZL: [
    p('Max Crocombe', 'GK', 'Millwall'), p('Alex Paulsen', 'GK', 'Lechia Gdańsk'), p('Michael Woud', 'GK', 'Auckland FC'),
    p('Tim Payne', 'DEF', 'Wellington Phoenix'), p('Francis de Vries', 'DEF', 'Auckland FC'), p('Tyler Bindon', 'DEF', 'Nottingham Forest'), p('Michael Boxall', 'DEF', 'Minnesota United'),
    p('Liberato Cacace', 'DEF', 'Wrexham'), p('Nando Pijnaker', 'DEF', 'Auckland FC'), p('Finn Surman', 'DEF', 'Portland Timbers'), p('Callan Elliot', 'DEF', 'Auckland FC'), p('Tommy Smith', 'DEF', 'Braintree Town'),
    p('Lachlan Bayliss', 'MID', 'Newcastle Jets'), p('Joe Bell', 'MID', 'Viking FK'), p('Matt Garbett', 'MID', 'Peterborough United'), p('Ben Old', 'MID', 'Saint-Étienne'),
    p('Alex Rufer', 'MID', 'Wellington Phoenix'), p('Sarpreet Singh', 'MID', 'Wellington Phoenix'), p('Marko Stamenić', 'MID', 'Swansea City'), p('Ryan Thomas', 'MID', 'PEC Zwolle'),
    p('Kosta Barbarouses', 'FWD', 'Western Sydney Wanderers'), p('Eli Just', 'FWD', 'Motherwell'), p('Callum McCowatt', 'FWD', 'Silkeborg'), p('Ben Waine', 'FWD', 'Port Vale'), p('Chris Wood', 'FWD', 'Nottingham Forest', true),
  ],

  // ---------------- Group H ----------------
  ESP: [
    p('Unai Simón', 'GK', 'Athletic Club'), p('David Raya', 'GK', 'Arsenal'), p('Joan García', 'GK', 'Barcelona'),
    p('Pedro Porro', 'DEF', 'Tottenham Hotspur'), p('Marc Cucurella', 'DEF', 'Chelsea'), p('Alejandro Grimaldo', 'DEF', 'Bayer Leverkusen'), p('Pau Cubarsí', 'DEF', 'Barcelona'),
    p('Aymeric Laporte', 'DEF', 'Athletic Club'), p('Marc Pubill', 'DEF', 'Atlético Madrid'), p('Eric García', 'DEF', 'Barcelona'), p('Marcos Llorente', 'DEF', 'Atlético Madrid'),
    p('Rodri', 'MID', 'Manchester City', true), p('Pedri', 'MID', 'Barcelona'), p('Fabián Ruiz', 'MID', 'Paris Saint-Germain'), p('Martín Zubimendi', 'MID', 'Arsenal'),
    p('Gavi', 'MID', 'Barcelona'), p('Mikel Merino', 'MID', 'Arsenal'), p('Álex Baena', 'MID', 'Atlético Madrid'),
    p('Lamine Yamal', 'FWD', 'Barcelona'), p('Nico Williams', 'FWD', 'Athletic Club'), p('Mikel Oyarzabal', 'FWD', 'Real Sociedad'), p('Dani Olmo', 'FWD', 'Barcelona'),
    p('Ferran Torres', 'FWD', 'Barcelona'), p('Yéremy Pino', 'FWD', 'Crystal Palace'), p('Borja Iglesias', 'FWD', 'Celta Vigo'), p('Víctor Muñoz', 'FWD', 'Osasuna'),
  ],
  CPV: [
    p('Vozinha', 'GK', 'Chaves'), p('Márcio Rosa', 'GK', 'Montana'), p('CJ dos Santos', 'GK', 'San Diego FC'),
    p('Steven Moreira', 'DEF', 'Columbus Crew'), p('Wagner Pina', 'DEF', 'Trabzonspor'), p('João Paulo', 'DEF', 'FCSB'), p('Sidny Lopes Cabral', 'DEF', 'Benfica'),
    p('Logan Costa', 'DEF', 'Villarreal'), p('Roberto Lopes', 'DEF', 'Shamrock Rovers'), p('Kelvin Pires', 'DEF', 'SJK Seinäjoki'), p('Stopira', 'DEF', 'Torreense'),
    p('Jamiro Monteiro', 'MID', 'PEC Zwolle'), p('Telmo Arcanjo', 'MID', 'Vitória SC'), p('Yannick Semedo', 'MID', 'Farense'), p('Laros Duarte', 'MID', 'Puskás Akadémia'),
    p('Deroy Duarte', 'MID', 'Ludogorets Razgrad'), p('Kevin Pina', 'MID', 'Krasnodar'), p('Diney', 'MID', 'Al Bataeh'),
    p('Ryan Mendes', 'FWD', 'Iğdır FK', true), p('Willy Semedo', 'FWD', 'Omonia Nicosia'), p('Garry Rodrigues', 'FWD', 'Apollon Limassol'), p('Jovane Cabral', 'FWD', 'Estrela da Amadora'),
    p('Nuno da Costa', 'FWD', 'İstanbul Başakşehir'), p('Dailon Livramento', 'FWD', 'Casa Pia'), p('Gilson Benchimol', 'FWD', 'Akron Tolyatti'), p('Hélio Varela', 'FWD', 'Maccabi Tel Aviv'),
  ],
  KSA: [
    p('Nawaf Al-Aqidi', 'GK', 'Al-Nassr'), p('Mohammed Al-Owais', 'GK', 'Al-Hilal'), p('Ahmed Al-Kassar', 'GK', 'Al-Qadsiah'),
    p('Saud Abdulhamid', 'DEF', 'RC Lens'), p('Abdulelah Al-Amri', 'DEF', 'Al-Nassr'), p('Hassan Tambakti', 'DEF', 'Al-Hilal'), p('Jehad Thikri', 'DEF', 'Al-Qadsiah'),
    p('Ali Lajami', 'DEF', 'Al-Hilal'), p('Hassan Kadesh', 'DEF', 'Al-Ittihad'), p('Ali Majrashi', 'DEF', 'Al-Ahli'), p('Nawaf Boushal', 'DEF', 'Al-Nassr'),
    p('Mohammed Kanno', 'MID', 'Al-Hilal'), p('Abdullah Al-Khaibari', 'MID', 'Al-Nassr'), p('Nasser Al-Dawsari', 'MID', 'Al-Hilal'), p('Musab Al-Juwayr', 'MID', 'Al-Qadsiah'), p('Ziyad Al-Johani', 'MID', 'Al-Ahli'),
    p('Salem Al-Dawsari', 'MID', 'Al-Hilal', true),
    p('Khalid Al-Ghannam', 'FWD', 'Al-Ettifaq'), p('Ayman Yahya', 'FWD', 'Al-Nassr'), p('Sultan Mandash', 'FWD', 'Al-Hilal'), p('Firas Al-Buraikan', 'FWD', 'Al-Ahli'),
    p('Saleh Al-Shehri', 'FWD', 'Al-Ittihad'), p('Abdullah Al-Hamdan', 'FWD', 'Al-Nassr'),
  ],
  URU: [
    p('Fernando Muslera', 'GK', 'Estudiantes'), p('Sergio Rochet', 'GK', 'Internacional'), p('Santiago Mele', 'GK', 'Junior'),
    p('Ronald Araújo', 'DEF', 'Barcelona'), p('José María Giménez', 'DEF', 'Atlético Madrid'), p('Guillermo Varela', 'DEF', 'Flamengo'), p('Santiago Bueno', 'DEF', 'Wolverhampton Wanderers'),
    p('Sebastián Cáceres', 'DEF', 'Club América'), p('Mathías Olivera', 'DEF', 'Napoli'), p('Joaquín Piquerez', 'DEF', 'Palmeiras'),
    p('Federico Valverde', 'MID', 'Real Madrid', true), p('Manuel Ugarte', 'MID', 'Manchester United'), p('Rodrigo Bentancur', 'MID', 'Tottenham Hotspur'), p('Giorgian de Arrascaeta', 'MID', 'Flamengo'),
    p('Nicolás de la Cruz', 'MID', 'Flamengo'), p('Facundo Pellistri', 'MID', 'Panathinaikos'), p('Maximiliano Araújo', 'MID', 'Sporting CP'), p('Brian Rodríguez', 'MID', 'Club América'),
    p('Agustín Canobbio', 'MID', 'Fluminense'), p('Rodrigo Zalazar', 'MID', 'SC Braga'),
    p('Darwin Núñez', 'FWD', 'Al-Hilal'), p('Rodrigo Aguirre', 'FWD', 'Club América'), p('Federico Viñas', 'FWD', 'Real Oviedo'),
  ],

  // ---------------- Group I ----------------
  FRA: [
    p('Mike Maignan', 'GK', 'AC Milan'), p('Brice Samba', 'GK', 'Rennes'), p('Robin Risser', 'GK', 'Strasbourg'),
    p('Jules Koundé', 'DEF', 'Barcelona'), p('William Saliba', 'DEF', 'Arsenal'), p('Ibrahima Konaté', 'DEF', 'Liverpool'), p('Dayot Upamecano', 'DEF', 'Bayern Munich'),
    p('Theo Hernandez', 'DEF', 'Al-Hilal'), p('Lucas Hernandez', 'DEF', 'Paris Saint-Germain'), p('Malo Gusto', 'DEF', 'Chelsea'), p('Lucas Digne', 'DEF', 'Aston Villa'), p('Maxence Lacroix', 'DEF', 'Crystal Palace'),
    p('Aurélien Tchouaméni', 'MID', 'Real Madrid'), p("N'Golo Kanté", 'MID', 'Fenerbahçe'), p('Adrien Rabiot', 'MID', 'AC Milan'), p('Manu Koné', 'MID', 'AS Roma'), p('Warren Zaïre-Emery', 'MID', 'Paris Saint-Germain'),
    p('Kylian Mbappé', 'FWD', 'Real Madrid', true), p('Ousmane Dembélé', 'FWD', 'Paris Saint-Germain'), p('Michael Olise', 'FWD', 'Bayern Munich'), p('Marcus Thuram', 'FWD', 'Inter Milan'),
    p('Bradley Barcola', 'FWD', 'Paris Saint-Germain'), p('Désiré Doué', 'FWD', 'Paris Saint-Germain'), p('Rayan Cherki', 'FWD', 'Manchester City'), p('Jean-Philippe Mateta', 'FWD', 'Crystal Palace'), p('Maghnes Akliouche', 'FWD', 'AS Monaco'),
  ],
  SEN: [
    p('Édouard Mendy', 'GK', 'Al-Ahli'), p('Mory Diaw', 'GK', 'Lens'), p('Yehvann Diouf', 'GK', 'Reims'),
    p('Kalidou Koulibaly', 'DEF', 'Al-Hilal', true), p('Moussa Niakhaté', 'DEF', 'Olympique Lyonnais'), p('Ismail Jakobs', 'DEF', 'Galatasaray'), p('Mamadou Sarr', 'DEF', 'Strasbourg'),
    p('Abdoulaye Seck', 'DEF', 'Maccabi Haifa'), p('Antoine Mendy', 'DEF', 'OGC Nice'), p('El Hadji Malick Diouf', 'DEF', 'West Ham United'), p('Krépin Diatta', 'DEF', 'AS Monaco'),
    p('Idrissa Gana Gueye', 'MID', 'Everton'), p('Pape Matar Sarr', 'MID', 'Tottenham Hotspur'), p('Pape Gueye', 'MID', 'Villarreal'), p('Lamine Camara', 'MID', 'AS Monaco'), p('Habib Diarra', 'MID', 'Sunderland'),
    p('Sadio Mané', 'FWD', 'Al-Nassr'), p('Nicolas Jackson', 'FWD', 'Bayern Munich'), p('Ismaïla Sarr', 'FWD', 'Crystal Palace'), p('Iliman Ndiaye', 'FWD', 'Everton'),
    p('Assane Diao', 'FWD', 'Como'), p('Ibrahima Mbaye', 'FWD', 'Paris Saint-Germain'), p('Chérif Ndiaye', 'FWD', 'Étoile du Sahel'),
  ],
  NOR: [
    p('Ørjan Nyland', 'GK', 'Sevilla'), p('Egil Selvik', 'GK', 'Watford'), p('Sander Tangvik', 'GK', 'Hamburger SV'),
    p('Julian Ryerson', 'DEF', 'Borussia Dortmund'), p('Kristoffer Ajer', 'DEF', 'Brentford'), p('Leo Skiri Østigård', 'DEF', 'Genoa'), p('David Møller Wolfe', 'DEF', 'Wolverhampton Wanderers'),
    p('Marcus Holmgren Pedersen', 'DEF', 'Torino'), p('Torbjørn Heggem', 'DEF', 'Bologna'), p('Fredrik Bjørkan', 'DEF', 'Bodø/Glimt'), p('Sondre Langås', 'DEF', 'Derby County'),
    p('Martin Ødegaard', 'MID', 'Arsenal', true), p('Sander Berge', 'MID', 'Fulham'), p('Patrick Berg', 'MID', 'Bodø/Glimt'), p('Kristian Thorstvedt', 'MID', 'Sassuolo'),
    p('Morten Thorsby', 'MID', 'Cremonese'), p('Thelo Aasgaard', 'MID', 'Rangers'), p('Fredrik Aursnes', 'MID', 'Benfica'),
    p('Andreas Schjelderup', 'FWD', 'Benfica'), p('Erling Haaland', 'FWD', 'Manchester City'), p('Alexander Sørloth', 'FWD', 'Atlético Madrid'), p('Jørgen Strand Larsen', 'FWD', 'Crystal Palace'),
    p('Oscar Bobb', 'FWD', 'Fulham'), p('Antonio Nusa', 'FWD', 'RB Leipzig'),
  ],
  IRQ: [
    p('Jalal Hassan', 'GK', 'Al-Shorta', true), p('Fahad Talib', 'GK', 'Al-Quwa Al-Jawiya'), p('Ahmed Basil', 'GK', 'Al-Zawraa'),
    p('Rebin Sulaka', 'DEF', 'Al-Najma'), p('Merchas Doski', 'DEF', 'Hapoel Tel Aviv'), p('Hussein Ali', 'DEF', 'Al-Zawraa'), p('Frans Putros', 'DEF', 'Al-Karkh'),
    p('Manaf Younis', 'DEF', 'Al-Shorta'), p('Mustafa Sadoon', 'DEF', 'Al-Quwa Al-Jawiya'), p('Zaid Tahseen', 'DEF', 'Al-Shorta'), p('Akam Hashim', 'DEF', 'Erbil'),
    p('Amir Al-Ammari', 'MID', 'Halmstad'), p('Zidane Iqbal', 'MID', 'FC Utrecht'), p('Ibrahim Bayesh', 'MID', 'Al-Quwa Al-Jawiya'), p('Ali Jasim', 'MID', 'Como'),
    p('Aimar Sher', 'MID', 'Spezia'), p('Kevin Yakob', 'MID', 'Gais'), p('Ahmed Qasem', 'MID', 'Falkenbergs'), p('Youssef Amyn', 'MID', 'Carl Zeiss Jena'),
    p('Aymen Hussein', 'FWD', 'Al-Shorta'), p('Ali Al-Hamadi', 'FWD', 'Ipswich Town'), p('Mohanad Ali', 'FWD', 'Al-Duhail'), p('Ali Yousif', 'FWD', 'BK Häcken'),
  ],

  // ---------------- Group J ----------------
  ARG: [
    p('Emiliano Martínez', 'GK', 'Aston Villa'), p('Gerónimo Rulli', 'GK', 'Olympique de Marseille'), p('Juan Musso', 'GK', 'Atlético Madrid'),
    p('Gonzalo Montiel', 'DEF', 'River Plate'), p('Nahuel Molina', 'DEF', 'Atlético Madrid'), p('Lisandro Martínez', 'DEF', 'Manchester United'), p('Nicolás Otamendi', 'DEF', 'Benfica'),
    p('Leonardo Balerdi', 'DEF', 'Olympique de Marseille'), p('Cristian Romero', 'DEF', 'Tottenham Hotspur'), p('Nicolás Tagliafico', 'DEF', 'Olympique Lyonnais'), p('Facundo Medina', 'DEF', 'Olympique de Marseille'), p('Valentín Barco', 'DEF', 'Strasbourg'),
    p('Giovani Lo Celso', 'MID', 'Real Betis'), p('Leandro Paredes', 'MID', 'Boca Juniors'), p('Rodrigo De Paul', 'MID', 'Inter Miami'), p('Exequiel Palacios', 'MID', 'Bayer Leverkusen'),
    p('Enzo Fernández', 'MID', 'Chelsea'), p('Alexis Mac Allister', 'MID', 'Liverpool'), p('Nico Paz', 'MID', 'Como'),
    p('Lionel Messi', 'FWD', 'Inter Miami', true), p('Nicolás González', 'FWD', 'Atlético Madrid'), p('Giuliano Simeone', 'FWD', 'Atlético Madrid'), p('Lautaro Martínez', 'FWD', 'Inter Milan'),
    p('José Manuel López', 'FWD', 'Palmeiras'), p('Julián Álvarez', 'FWD', 'Atlético Madrid'), p('Thiago Almada', 'FWD', 'Atlético Madrid'),
  ],
  ALG: [
    p('Luca Zidane', 'GK', 'Granada'), p('Oussama Benbot', 'GK', 'USM Alger'), p('Melvin Mastil', 'GK', 'Stade Nyonnais'),
    p('Rafik Belghali', 'DEF', 'Hellas Verona'), p('Samir Chergui', 'DEF', 'Red Star FC'), p('Rayan Aït-Nouri', 'DEF', 'Manchester City'), p('Jaouen Hadjam', 'DEF', 'Young Boys'),
    p('Aïssa Mandi', 'DEF', 'Lille'), p('Ramy Bensebaïni', 'DEF', 'Borussia Dortmund'), p('Zineddine Belaïd', 'DEF', 'JS Kabylie'), p('Mohamed Amine Tougai', 'DEF', 'ES Tunis'),
    p('Nabil Bentaleb', 'MID', 'Lille'), p('Hicham Boudaoui', 'MID', 'Nice'), p('Houssem Aouar', 'MID', 'Al-Ittihad'), p('Farès Chaïbi', 'MID', 'Eintracht Frankfurt'),
    p('Ibrahim Maza', 'MID', 'Bayer Leverkusen'), p('Yacine Titraoui', 'MID', 'Charleroi'), p('Ramiz Zerrouki', 'MID', 'FC Twente'),
    p('Mohamed Amoura', 'FWD', 'VfL Wolfsburg'), p('Nadhir Benbouali', 'FWD', 'Győri ETO'), p('Adil Boulbina', 'FWD', 'Al-Duhail'), p('Farès Ghedjemis', 'FWD', 'Frosinone'),
    p('Amine Gouiri', 'FWD', 'Olympique de Marseille'), p('Anis Hadj Moussa', 'FWD', 'Feyenoord'), p('Riyad Mahrez', 'FWD', 'Al-Ahli', true),
  ],
  AUT: [
    p('Patrick Pentz', 'GK', 'Brøndby'), p('Alexander Schlager', 'GK', 'Red Bull Salzburg'), p('Florian Wiegele', 'GK', 'Viktoria Plzeň'),
    p('David Alaba', 'DEF', 'Real Madrid', true), p('Kevin Danso', 'DEF', 'Tottenham Hotspur'), p('Marco Friedl', 'DEF', 'Werder Bremen'), p('Philipp Lienhart', 'DEF', 'SC Freiburg'),
    p('Phillipp Mwene', 'DEF', 'Mainz 05'), p('Stefan Posch', 'DEF', 'Mainz 05'), p('Alexander Prass', 'DEF', 'TSG Hoffenheim'), p('Michael Svoboda', 'DEF', 'Venezia'), p('David Affengruber', 'DEF', 'Elche'),
    p('Christoph Baumgartner', 'MID', 'RB Leipzig'), p('Carney Chukwuemeka', 'MID', 'Borussia Dortmund'), p('Florian Grillitsch', 'MID', 'Braga'), p('Konrad Laimer', 'MID', 'Bayern Munich'),
    p('Marcel Sabitzer', 'MID', 'Borussia Dortmund'), p('Xaver Schlager', 'MID', 'RB Leipzig'), p('Romano Schmid', 'MID', 'Werder Bremen'), p('Nicolas Seiwald', 'MID', 'RB Leipzig'),
    p('Paul Wanner', 'MID', 'PSV Eindhoven'), p('Patrick Wimmer', 'MID', 'VfL Wolfsburg'),
    p('Marko Arnautović', 'FWD', 'Red Star Belgrade'), p('Michael Gregoritsch', 'FWD', 'FC Augsburg'), p('Saša Kalajdžić', 'FWD', 'LASK'),
  ],
  JOR: [
    p('Yazeed Abu Laila', 'GK', 'Al-Hussein'), p('Abdallah Al-Fakhouri', 'GK', 'Al-Wehdat'), p('Nour Bani Attiah', 'GK', 'Al-Faisaly'),
    p('Mohammad Abu Al-Nadi', 'DEF', 'Selangor'), p('Husam Abu Dahab', 'DEF', 'Al-Salmiya'), p('Mohammad Abu Hashish', 'DEF', 'Al-Karma'), p('Yazan Al-Arab', 'DEF', 'Seoul'),
    p('Saleem Obaid', 'DEF', 'Al-Hussein'), p('Abdallah Nasib', 'DEF', 'Al-Zawraa'), p('Ehsan Haddad', 'DEF', 'Al-Hussein', true), p('Yousef Abu Al-Jazar', 'DEF', 'Al-Hussein'), p('Hadi Al-Hourani', 'DEF', 'Al-Faisaly'),
    p('Mohammad Al-Dawoud', 'MID', 'Al-Wehdat'), p('Nizar Al-Rashdan', 'MID', 'Qatar SC'), p('Noor Al-Rawabdeh', 'MID', 'Selangor'), p('Rajaei Ayed', 'MID', 'Al-Hussein'),
    p('Amer Jamous', 'MID', 'Al-Zawraa'), p('Ibrahim Sadeh', 'MID', 'Al-Karma'),
    p('Mousa Al-Tamari', 'FWD', 'Stade Rennais'), p('Ali Olwan', 'FWD', 'Al-Sailiya'), p('Yazan Al-Naimat', 'FWD', 'Al-Arabi'), p('Mahmoud Al-Mardi', 'FWD', 'Al-Hussein'),
    p('Ibrahim Sabra', 'FWD', 'Lokomotiva Zagreb'), p('Mohannad Abu Taha', 'FWD', 'Al-Quwa Al-Jawiya'),
  ],

  // ---------------- Group K ----------------
  POR: [
    p('Diogo Costa', 'GK', 'FC Porto'), p('José Sá', 'GK', 'Wolverhampton Wanderers'), p('Rui Silva', 'GK', 'Sporting CP'),
    p('Diogo Dalot', 'DEF', 'Manchester United'), p('Nélson Semedo', 'DEF', 'Fenerbahçe'), p('João Cancelo', 'DEF', 'Barcelona'), p('Nuno Mendes', 'DEF', 'Paris Saint-Germain'),
    p('Gonçalo Inácio', 'DEF', 'Sporting CP'), p('Renato Veiga', 'DEF', 'Villarreal'), p('Rúben Dias', 'DEF', 'Manchester City'), p('Tomás Araújo', 'DEF', 'Benfica'), p('Matheus Nunes', 'DEF', 'Manchester City'),
    p('Rúben Neves', 'MID', 'Al-Hilal'), p('João Neves', 'MID', 'Paris Saint-Germain'), p('Vitinha', 'MID', 'Paris Saint-Germain'), p('Bruno Fernandes', 'MID', 'Manchester United'), p('Bernardo Silva', 'MID', 'Manchester City'),
    p('João Félix', 'FWD', 'Al-Nassr'), p('Francisco Trincão', 'FWD', 'Sporting CP'), p('Francisco Conceição', 'FWD', 'Juventus'), p('Pedro Neto', 'FWD', 'Chelsea'),
    p('Rafael Leão', 'FWD', 'AC Milan'), p('Gonçalo Ramos', 'FWD', 'Paris Saint-Germain'), p('Cristiano Ronaldo', 'FWD', 'Al-Nassr', true),
  ],
  UZB: [
    p('Utkir Yusupov', 'GK', 'Navbahor'), p('Abduvohid Nematov', 'GK', 'Nasaf'), p('Botirali Ergashev', 'GK', 'Neftchi'),
    p('Abdukodir Khusanov', 'DEF', 'Manchester City'), p('Khojiakbar Alijonov', 'DEF', 'Pakhtakor'), p('Farrukh Sayfiev', 'DEF', 'Neftchi'), p('Rustam Ashurmatov', 'DEF', 'Esteghlal'),
    p('Umar Eshmurodov', 'DEF', 'Nasaf'), p('Sherzod Nasrullaev', 'DEF', 'Pakhtakor'), p('Abdulla Abdullaev', 'DEF', 'Dibba Al-Hisn'), p('Jakhongir Urozov', 'DEF', 'Dinamo Samarqand'), p('Behruz Karimov', 'DEF', 'Surkhon'),
    p('Akmal Mozgovoy', 'MID', 'Pakhtakor'), p('Otabek Shukurov', 'MID', 'Baniyas'), p('Jamshid Iskanderov', 'MID', 'Neftchi'), p('Odiljon Hamrobekov', 'MID', 'Tractor'),
    p('Jaloliddin Masharipov', 'MID', 'Esteghlal'), p('Oston Urunov', 'MID', 'Persepolis'), p('Dostonbek Khamdamov', 'MID', 'Pakhtakor'), p('Azizjon Ganiev', 'MID', 'Al Bataeh'), p('Abbosbek Fayzullaev', 'MID', 'İstanbul Başakşehir'),
    p('Eldor Shomurodov', 'FWD', 'İstanbul Başakşehir', true), p('Igor Sergeev', 'FWD', 'Persepolis'), p('Azizbek Amonov', 'FWD', 'Dinamo Samarqand'),
  ],
  COL: [
    p('Álvaro Montero', 'GK', 'Vélez Sarsfield'), p('Camilo Vargas', 'GK', 'Atlas'), p('David Ospina', 'GK', 'Atlético Nacional'),
    p('Jhon Lucumí', 'DEF', 'Bologna'), p('Davinson Sánchez', 'DEF', 'Galatasaray'), p('Yerry Mina', 'DEF', 'Cagliari'), p('Johan Mojica', 'DEF', 'Mallorca'),
    p('Daniel Muñoz', 'DEF', 'Crystal Palace'), p('Santiago Arias', 'DEF', 'Independiente'), p('Deiver Machado', 'DEF', 'Nantes'), p('Willer Ditta', 'DEF', 'Cruz Azul'),
    p('Richard Ríos', 'MID', 'Benfica'), p('Jefferson Lerma', 'MID', 'Crystal Palace'), p('Kevin Castaño', 'MID', 'River Plate'), p('Gustavo Puerta', 'MID', 'Racing Santander'),
    p('Jorge Carrascal', 'MID', 'Flamengo'), p('James Rodríguez', 'MID', 'Minnesota United', true), p('Jhon Arias', 'MID', 'Wolverhampton Wanderers'), p('Juan Fernando Quintero', 'MID', 'River Plate'), p('Jaminton Campaz', 'MID', 'Rosario Central'),
    p('Luis Díaz', 'FWD', 'Bayern Munich'), p('Andrés Gómez', 'FWD', 'Vasco da Gama'), p('Luis Javier Suárez', 'FWD', 'Sporting CP'), p('Jhon Córdoba', 'FWD', 'Krasnodar'), p('Juan Camilo Hernández', 'FWD', 'Real Betis'),
  ],
  COD: [
    p('Lionel Mpasi', 'GK', 'Le Havre'), p('Timothy Fayulu', 'GK', 'FC Noah'), p('Matthieu Epolo', 'GK', 'Standard Liège'),
    p('Chancel Mbemba', 'DEF', 'Lille', true), p('Aaron Wan-Bissaka', 'DEF', 'West Ham United'), p('Axel Tuanzebe', 'DEF', 'Burnley'), p('Arthur Masuaku', 'DEF', 'Lens'),
    p('Gédéon Kalulu', 'DEF', 'Aris Limassol'), p('Joris Kayembe', 'DEF', 'Genk'), p('Dylan Batubinsika', 'DEF', 'AEL'), p('Steve Kapuadi', 'DEF', 'Widzew Łódź'),
    p('Meschak Elia', 'MID', 'Alanyaspor'), p('Samuel Moutoussamy', 'MID', 'Atromitos'), p('Edo Kayembe', 'MID', 'Watford'), p('Charles Pickel', 'MID', 'Espanyol'),
    p('Gaël Kakuta', 'MID', 'AEL'), p('Noah Sadiki', 'MID', 'Sunderland'), p('Nathanaël Mbuku', 'MID', 'Montpellier'), p("Ngal'ayel Mukau", 'MID', 'Lille'),
    p('Cédric Bakambu', 'FWD', 'Real Betis'), p('Théo Bongonda', 'FWD', 'Spartak Moscow'), p('Fiston Mayele', 'FWD', 'Pyramids FC'), p('Yoane Wissa', 'FWD', 'Newcastle United'), p('Simon Banza', 'FWD', 'Al Jazira'),
  ],

  // ---------------- Group L ----------------
  ENG: [
    p('Jordan Pickford', 'GK', 'Everton'), p('Dean Henderson', 'GK', 'Crystal Palace'), p('James Trafford', 'GK', 'Manchester City'),
    p('Reece James', 'DEF', 'Chelsea'), p('Ezri Konsa', 'DEF', 'Aston Villa'), p('Jarell Quansah', 'DEF', 'Bayer Leverkusen'), p('John Stones', 'DEF', 'Manchester City'),
    p('Marc Guéhi', 'DEF', 'Crystal Palace'), p('Dan Burn', 'DEF', 'Newcastle United'), p("Nico O'Reilly", 'DEF', 'Manchester City'), p('Djed Spence', 'DEF', 'Tottenham Hotspur'), p('Tino Livramento', 'DEF', 'Newcastle United'),
    p('Declan Rice', 'MID', 'Arsenal'), p('Elliot Anderson', 'MID', 'Nottingham Forest'), p('Kobbie Mainoo', 'MID', 'Manchester United'), p('Jordan Henderson', 'MID', 'Brentford'),
    p('Morgan Rogers', 'MID', 'Aston Villa'), p('Jude Bellingham', 'MID', 'Real Madrid'), p('Eberechi Eze', 'MID', 'Arsenal'),
    p('Harry Kane', 'FWD', 'Bayern Munich', true), p('Ivan Toney', 'FWD', 'Al-Ahli'), p('Ollie Watkins', 'FWD', 'Aston Villa'), p('Bukayo Saka', 'FWD', 'Arsenal'),
    p('Marcus Rashford', 'FWD', 'Barcelona'), p('Anthony Gordon', 'FWD', 'Newcastle United'),
  ],
  CRO: [
    p('Dominik Livaković', 'GK', 'Dinamo Zagreb'), p('Dominik Kotarski', 'GK', 'Copenhagen'), p('Ivor Pandur', 'GK', 'Hull City'),
    p('Joško Gvardiol', 'DEF', 'Manchester City'), p('Duje Ćaleta-Car', 'DEF', 'Real Sociedad'), p('Josip Šutalo', 'DEF', 'Ajax'), p('Josip Stanišić', 'DEF', 'Bayern Munich'),
    p('Marin Pongračić', 'DEF', 'Fiorentina'), p('Martin Erlić', 'DEF', 'Midtjylland'), p('Luka Vušković', 'DEF', 'Hamburg'),
    p('Luka Modrić', 'MID', 'AC Milan', true), p('Mateo Kovačić', 'MID', 'Manchester City'), p('Mario Pašalić', 'MID', 'Atalanta'), p('Nikola Vlašić', 'MID', 'Torino'),
    p('Luka Sučić', 'MID', 'Real Sociedad'), p('Martin Baturina', 'MID', 'Como'), p('Kristijan Jakić', 'MID', 'Augsburg'), p('Petar Sučić', 'MID', 'Inter'), p('Nikola Moro', 'MID', 'Bologna'), p('Toni Fruk', 'MID', 'Rijeka'),
    p('Ivan Perišić', 'FWD', 'PSV Eindhoven'), p('Andrej Kramarić', 'FWD', 'Hoffenheim'), p('Ante Budimir', 'FWD', 'Osasuna'), p('Marco Pašalić', 'FWD', 'Orlando City'),
    p('Petar Musa', 'FWD', 'FC Dallas'), p('Igor Matanović', 'FWD', 'Freiburg'),
  ],
  GHA: [
    p('Benjamin Asare', 'GK', 'Hearts of Oak'), p('Lawrence Ati-Zigi', 'GK', 'St. Gallen'), p('Joseph Anang', 'GK', "St Patrick's Athletic"),
    p('Baba Abdul Rahman', 'DEF', 'PAOK'), p('Derrick Luckassen', 'DEF', 'Pafos'), p('Gideon Mensah', 'DEF', 'Auxerre'), p('Marvin Senaya', 'DEF', 'Auxerre'),
    p('Alidu Seidu', 'DEF', 'Rennes'), p('Abdul Mumin', 'DEF', 'Rayo Vallecano'), p('Jerome Opoku', 'DEF', 'İstanbul Başakşehir'), p('Jonas Adjetey', 'DEF', 'Wolfsburg'), p('Kojo Oppong Peprah', 'DEF', 'Nice'),
    p('Thomas Partey', 'MID', 'Villarreal'), p('Kamaldeen Sulemana', 'MID', 'Atalanta'), p('Kwasi Sibo', 'MID', 'Real Oviedo'), p('Augustine Boakye', 'MID', 'Saint-Étienne'),
    p('Caleb Yirenkyi', 'MID', 'Nordsjælland'), p('Abdul Fatawu Issahaku', 'MID', 'Leicester City'), p('Elisha Owusu', 'MID', 'Auxerre'),
    p('Christopher Bonsu Baah', 'FWD', 'Al Qadsiah'), p('Ernest Nuamah', 'FWD', 'Lyon'), p('Antoine Semenyo', 'FWD', 'Manchester City'), p('Brandon Thomas-Asante', 'FWD', 'Coventry City'),
    p('Iñaki Williams', 'FWD', 'Athletic Club'), p('Jordan Ayew', 'FWD', 'Leicester City', true),
  ],
  PAN: [
    p('Orlando Mosquera', 'GK', 'Al-Fayha'), p('Luis Mejía', 'GK', 'Nacional'), p('César Samudio', 'GK', 'Marathón'),
    p('César Blackman', 'DEF', 'Slovan Bratislava'), p('Jorge Gutiérrez', 'DEF', 'Deportivo La Guaira'), p('Amir Murillo', 'DEF', 'Beşiktaş'), p('Fidel Escobar', 'DEF', 'Saprissa'),
    p('Andrés Andrade', 'DEF', 'LASK'), p('Edgardo Fariña', 'DEF', 'Pari Nizhny Novgorod'), p('José Córdoba', 'DEF', 'Norwich City'), p('Eric Davis', 'DEF', 'Plaza Amador'),
    p('Jiovany Ramos', 'DEF', 'Puerto Cabello'), p('Roderick Miller', 'DEF', 'Turan Tovuz'),
    p('Aníbal Godoy', 'MID', 'San Diego FC', true), p('Carlos Harvey', 'MID', 'Minnesota United'), p('Cristian Martínez', 'MID', 'Hapoel Ironi Kiryat Shmona'), p('José Luis Rodríguez', 'MID', 'Juárez'),
    p('César Yanis', 'MID', 'Cobresal'), p('Yoel Bárcenas', 'MID', 'Mazatlán'), p('Azarías Londoño', 'MID', 'Universidad Católica'), p('Adalberto Carrasquilla', 'MID', 'UNAM'), p('Alberto Quintero', 'MID', 'Plaza Amador'),
    p('Ismael Díaz', 'FWD', 'León'), p('Cecilio Waterman', 'FWD', 'Universidad de Concepción'), p('José Fajardo', 'FWD', 'Universidad Católica'), p('Tomás Rodríguez', 'FWD', 'Saprissa'),
  ],
}

export function squadFor(code: string): Player[] {
  return squads[code] ?? []
}

const POS_ORDER: Record<string, number> = { GK: 0, DEF: 1, MID: 2, FWD: 3 }

export function squadByPosition(code: string): { pos: string; label: string; players: Player[] }[] {
  const list = squadFor(code)
  const groups: Record<string, Player[]> = { GK: [], DEF: [], MID: [], FWD: [] }
  for (const pl of list) (groups[pl.pos] ??= []).push(pl)
  const labels: Record<string, string> = { GK: 'Golmani', DEF: 'Odbrana', MID: 'Vezni red', FWD: 'Napad' }
  return Object.keys(groups)
    .sort((a, b) => POS_ORDER[a] - POS_ORDER[b])
    .filter((k) => groups[k].length)
    .map((k) => ({ pos: k, label: labels[k], players: groups[k] }))
}
