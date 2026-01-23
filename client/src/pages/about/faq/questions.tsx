export const questions = [
  {
    key: "q1",
    groupkey: "general",
    icon: "fas fa-question-circle",
    label: {
      fr: "A quoi sert scanR ?",
      en: "What is scanR for?",
    },
    definition: {
      fr: "scanR est un outil d'exploration du paysage de la recherche et de l'innovation en France. Il a pour ambition d'aider à comprendre qui sont les acteurs de la recherche et de l'innovation en France, à mettre en valeur leur travail. scanR s'adresse à tous dans une logique de transparence de travaux largement soutenus par les crédits publics. Il vise également à favoriser l'appropriation par tous des dernières avancées de la recherche et de l'innovation pour alimenter le débat public. scanR entend contribuer à l'intensification de liens entre différents acteurs (appartenant à des champs de recherche ou de statut différent), vecteur de dynamisation de cette activité. Enfin, en ouvrant l’intégralité de ses données, scanR encourage les réutilisations publiques ou privées.",
      en: "scanR is a tool for exploring the research and innovation landscape in France. It aims to help understand who are the actors of research and innovation in France, to promote their work. scanR is intended for the entire French society in a logic of transparency of work largely supported by public funds. It also aims to promote access for all to the latest research and innovation developments in order to stimulate public debate. Finally, scanR intends to contribute to the intensification of links between different actors (belonging to different fields of research or status) which are an important vector for boosting this activity.",
    },
  },
  {
    key: "q2",
    groupkey: "general",
    icon: "fas fa-question-circle",
    label: {
      fr: "Quelle est la nature du lien entre scanR et le Baromètre de la Science Ouverte ?",
      en: "What is the link between scanR and the Open Science Barometer?",
    },
    definition: {
      fr: "Le baromètre de la science ouverte (BSO) a pour objectif de mesurer les progrès de l’accès ouvert aux ressources scientifiques associées à une affiliation en France : publications, données, codes. Publié pour la première fois par le ministère en charge de l’enseignement supérieur et de la recherche en 2019 sur le seul champ des publications scientifiques avec DOI Crossref, il couvre désormais les données, les codes et logiciels ainsi que les essais cliniques. scanR partage avec le BSO les publications scientifiques disposant d’un DOI Crossref et expose le statut d’ouverture de chaque publication ainsi qu’un lien de redirection avec la page éditeur et le texte intégral quand celui-ci est disponible. Le périmètre des travaux de recherche restitués dans scanR est cependant plus large puisqu'il couvre également les thèses soutenues depuis 1990 (theses.fr), les ouvrages et monographies (SUDOC) parus depuis 2013 pour les auteurs de thèses et publications scientifique repérés par scanR ainsi que toutes les publications déposées dans HAL (et publiées après 2013), notamment celles sans DOI. La multiplicité d'identifiants engendrée peut ainsi être à la source de doublons dans scanR, mais c'est au bénéfice de la couverture et donc de l'exploration possible dans scanR.",
      en: "The Open Science Barometer (OSB) aims to measure progress in open access to scientific resources: publications, data, code. First published by the Ministry of Higher Education, Research and Innovation in 2019, it focuses to date only on scientific publications with a DOI. For research publications with DOI, scanR includes the opening status information used for the BSO \n <b> The scope of the research work returned in scanR is broader </b> since it also covers PhD thesis defended since 1990 (theses.fr), books and monographs (SUDOC) published since 2013 as well as all publications uploaded in HAL (and published after 2013), particularly those without DOI. The multiplicity of identifiers generated can thus be at the source of duplicates in scanR, but this is to the benefit of coverage and user experience in scanR.",
    },
  },
  {
    key: "q3",
    groupkey: "general",
    icon: "fas fa-question-circle",
    label: {
      fr: "scanR est-il exhaustif ?",
      en: "Is scanR exhaustive?",
    },
    definition: {
      fr: "<b>Non</b>, scanR n'est pas exhaustif dans ses repérages. scanR peut comporter des erreurs et des omissions (voir FAQ <aQ7> Peut-il y avoir des erreurs dans scanR ? </aQ7> ) et ne traite que des sources ouvertes et réutilisables.",
      en: "<b>No</b>, scanR is not exhaustive in its tracking. scanR may contain errors and omissions (see FAQ <aQ7> Can there be errors in scanR? </aQ7>) and only deals with open and reusable sources.",
    },
  },
  {
    key: "q4",
    groupkey: "general",
    icon: "fas fa-question-circle",
    label: {
      fr: "Que trouve-t-on dans scanR ?",
      en: "What is in scanR?",
    },
    definition: {
      fr: "scanR s'intéresse à 5 types d'Objets principaux : les <b>entités</b>, les <b>projets</b>, les <b>auteurs</b> et les <b>publications</b> (publications scientifiques, thèses, ouvrages et monographies) et les <b>brevets</b>. Parmi les entités, scanR couvre l'ensemble des structures de recherche référencées dans le Répertoire national des structures de recherche (RNSR) ainsi que leur tutelle. Il couvre également, de la manière la plus complète possible, l'ensemble des institutions publiques ou privées, avec ou sans but lucratif mentionnées dans les principales sources mobilisées. scanR couvre un ensemble de Projets qui correspondent à des travaux de recherche qui ont fait l'objet d'un financement public français ou non dans la mesure où une source ouverte et réutilisable existe (voir FAQ <aQ18> Quels sont les financements recensés dans scanR ? </aQ18>). scanR couvre les auteurs disposant d'un identifiant Idref (voir FAQ <aQ27> Quels auteurs disposent d'un profil-auteur dans scanR ?</aQ27>) pour lesquels au moins un lien vers une autre source (RNSR, publication, brevet, projet) a pu être établi. Pour éviter les erreurs, scanR exclut les auteurs homonymes. Sur demande et en disposant d'informations complémentaires, scanR pourra les introduire individuellement. Sur demande, scanR pourra également supprimer une fiche auteur sans pour autant supprimer les travaux qui lui étaient associés scanR couvre les publications (voir FAQ <aQ31> Quel est le périmètre des publications de recherche (articles, thèses, monographies) présenté dans scanR ? </aQ31>) depuis 2013, une sélection d'ouvrages et de monographies, les thèses depuis 1990, les brevets depuis 2013.",
      en: 'scanR focuses on 4 main types of "Objects": <b>entities</b>, <b>projects</b>, <b>persons</b> and <b>productions</b> (publications, PhD thesis and patents).\nAmong the "entities", scanR covers all the research structures referenced in the National Directory of Research Structures (RNSR) as well as their institutions. It also covers, in the most comprehensive way possible, all public or private institutions, whether profit-making or not, mentioned in the main sources mobilized.\nscanR covers a set of "Projects" that correspond to research works that have been the subject of French public funding or not insofar as an open and reusable source exists (see FAQ <aQ18> What are the funding identified in scanR? </aQ18>).\nscanR covers authors with an Idref identifier (see FAQ <aQ27> Which authors have an author profile in scanR? </aQ27>) for whom at least one link to another source (RNSR, production, project) could be established. To avoid errors, scanR excludes homonymous authors. On request and with additional information, scanR can introduce them individually.\nscanR covers publications (see FAQ <aQ31> What is the scope of research publications (articles, theses, monographs) presented in scanR? </aQ31>) since 2013, a selection of books and monographs, theses since 1990, patents since 2013.',
    },
    formating: { strong: (chunks) => <strong>{chunks}</strong> },
  },
  {
    key: "q5",
    groupkey: "general",
    icon: "fas fa-question-circle",
    label: {
      fr: "Puis-je utiliser scanR pour évaluer une entité ou un auteur ?",
      en: "Can I use scanR to evaluate an entity or author?",
    },
    definition: {
      fr: "<b>Non</b>, car scanR est conçu avant tout comme un outil d'exploration de la recherche et de l'innovation en France. scanR est un outil ouvert, accessible à tous y compris aux institutions en charge de l'évaluation ou de l'allocation de crédits. Dans la limite de ses moyens, scanR est transparent sur les conditions d'élaboration de l'information et considère ses utilisateurs comme responsables des usages qu'ils font de la solution proposée (voir FAQ, glossaire et éléments d'information sur chaque page de l'application).\nL'équipe en charge de scanR estime que l'application ne peut que constituer un outil de dialogue qualitatif et personnalisé sur les activités de recherche et d'innovation d'une entité ou d'un auteur.",
      en: "<b>No</b>, because scanR is designed above all as a tool for exploring research and innovation in France. scanR is an open tool, accessible to everyone, including institutions in charge of evaluation or funding. Within the limits of its resources, scanR is transparent about the conditions under which the information is prepared and considers its users to be responsible for the uses they make of the proposed solution (see FAQ, glossary and information elements on each page of the application).\nThe scanR team believes that the application can only be a tool for qualitative and personalized dialogue on the research and innovation activities of an entity or author.",
    },
  },
  {
    key: "q6",
    groupkey: "general",
    icon: "fas fa-question-circle",
    label: {
      fr: "Quelles précautions prendre pour bien interpréter les informations et les chiffres restitués dans scanR ?",
      en: "What precautions should be taken to properly interpret the information and figures returned in scanR?",
    },
    definition: {
      fr: "<b>scanR ne garantit pas l'exhaustivité de ses repérages</b>. En conséquence, les différents dénombrements proposés au fil des pages de l'application ne donnent des indications que sur le volume détecté par scanR. Même si ces dénombrements peuvent se rapprocher de l'exhaustivité, scanR ne garantit pas et ne garantira jamais l'exhaustivité de la couverture.",
      en: "<b>scanR does not guarantee the comprehensiveness of its tracking</b>. Consequently, the different counts offered over the pages of the application only give indications of the volume detected by scanR. Although these counts may be close to completeness, scanR does not and will never guarantee completeness of coverage.",
    },
  },
  {
    key: "q7",
    groupkey: "general",
    icon: "fas fa-question-circle",
    label: {
      fr: "Peut-il y avoir des erreurs dans scanR ?",
      en: "Can there be errors in scanR?",
    },
    definition: {
      fr: "<b>Oui</b>, il peut y en avoir.<br></br> Comme tout outil mobilisant une quantité massive d'informations hétérogènes, scanR peut présenter des erreurs, des omissions, des imprécisions. Celles-ci peuvent provenir de différentes origines (internes, liées aux sources ou aux référentiels, voir FAQ <aQ10> \"D'où proviennent les erreurs que l'on peut constater dans scanR ?\" </aQ10>).<br></br> Cependant, l'objectif de scanR n'est pas la production de métriques. scanR vise à fournir, sur la base d'informations ouvertes et réutilisables, des indications proches de la réalité sur les orientations des laboratoires et institutions publiques, des entreprises en matière de recherche et d'innovation. Il s'agit de valoriser les travaux conduits dans les laboratories, de rendre compte à tous de travaux largement conduits sur la base de financements publics, de contribuer à l'appropriation par tous, notamment dans le débat public, des connaissances scientifiques actuelles, de faciliter les mises en relations pour dynamiser cette activité en France.<br></br> Dans ces conditions, l'erreur, assumée et traitée, est tolérée. Cette visibilité de l'erreur est ainsi perçue comme facteur d'amélioration de la qualité.\nEn soumettant aux utilisateurs, souvent les meilleurs connaisseurs des réalités de terrain, l'information telle qu'elle est et non telle qu'on s'attend à ce qu'elle soit, et en leur donnant la possibilité d'effectuer des signalements, il s'agit : \n(1) d'inciter l'équipe de scanR à demeurer dans une démarche d'amélioration continue de ses processus\n(2) de contribuer à l'amélioration des sources et référentiels eux-mêmes.\n <br></br> Ainsi, les signalements réalisés par les utilisateurs de scanR sont traités systématiquement. Quand l'erreur relève de la qualité des sources et référentiels, suivant le cas, le signalement est reporté directement au responsable de la source ou l'utilisateur est orienté vers le responsable de la source ou un correspondant local qui effectuera les ajustements nécessaires ou accompagnera l'utilisateur pour les réaliser.\nVous avez constaté une erreur ? Dites le nous !",
      en: "<b>Yes</b>, there may be.<br></br> Like any tool that mobilizes a massive amount of heterogeneous information, scanR can contain errors, omissions and inaccuracies. These can come from different origins (internal, source-related or repository-related, see FAQ <aQ10> Where do the errors in scanR come from? </aQ10>). <br></br> However, the objective of scanR is not the production of metrics. scanR aims to provide, on the basis of open and reusable information, realistic indications on the orientations of public laboratories and institutions, companies in terms of research and innovation. The aim is to enhance the value of the work carried out in the laboratories, to report to everyone on work largely carried out on the basis of public funding, to make current scientific knowledge accessible to everyone, particularly in the public debate, and to facilitate networking to boost this activity in France. <br></br> Under these conditions, the error, assumed and processed, is tolerated. This visibility of error is thus perceived as a factor in improving quality.\nscanR offers its users, often the best experts in the field, information as it is and not as it is expected to be. By giving them the opportunity to report, the goal is: \n(1) to encourage the scanR team to remain in a process of continuous improvement of its processes\n(2) to contribute to the improvement of the sources and repositories themselves.\n <br></br> Thus, reports made by scanR users are systematically processed. When the error is related to the quality of sources and repositories, as the case may be, the report is reported directly to the source manager or the user is directed to the source manager or a local correspondent who will make the necessary adjustments or accompany the user to make them.\nDid you notice an error? Tell us about it!",
    },
  },
  {
    key: "q8",
    groupkey: "general",
    icon: "fas fa-question-circle",
    label: {
      fr: "scanR est-il producteur de données ?",
      en: "Is scanR a data producer?",
    },
    definition: {
      fr: "scanR ne produit pas directement de données, mais les consomme. scanR traite une multiplicité de sources, les nettoie, les croise et les concentre pour rendre l'information plus accessible et de meilleure qualité.",
      en: "scanR does not directly produce data, but consumes it. scanR processes a variety of sources, cleans, crosses and concentrates them to make information more accessible and of better quality.",
    },
  },
  {
    key: "q9",
    groupkey: "general",
    icon: "fas fa-question-circle",
    label: {
      fr: "Comment se positionne scanR dans le cycle de vie des données ?",
      en: "How is scanR positioned in the data life cycle?",
    },
    definition: {
      fr: "scanR étant un consommateur plutôt qu'un producteur de données, en cas d'erreur, il est préférable de corriger la donnée le plus en amont, à savoir dans la (ou les) sources consommées par scanR plutôt que seulement dans scanR.",
      en: "scanR being a consumer rather than a data producer, in case of error, it is preferable to correct the most upstream data, i.e. in the source(s) used by scanR rather than only in scanR.",
    },
  },
  {
    key: "q10",
    groupkey: "general",
    icon: "fas fa-question-circle",
    label: {
      fr: "D'où proviennent les erreurs que l'on peut constater dans scanR ?",
      en: "Where do the errors in scanR come from?",
    },
    definition: {
      fr: "Trois principaux facteurs d'erreurs, d'imprécision et d'omission influencent la qualité des données de scanR : la qualité des traitements réalisés par scanR, celle des sources et celles des référentiels qui décrivent les 'objets' présentés dans scanR (entités, auteurs, projets, productions). <br></br> Même si scanR s'attache en permanence à adapter ses méthodes et outils pour limiter ses erreurs internes, palier des difficultés nouvellement identifiées, des erreurs de codage, des particularités non identifiées peuvent entraîner des erreurs ou des omissions dans les données restituées. Mais les erreurs de scanR peuvent provenir de deux autres origines, indépendantes des travaux de traitement de l'information réalisés par scanR : (1) la qualité des sources : rares sont les sources mobilisées par scanR qui intègrent systématiquement un identifiant interopérable. <br></br> Quand c'est le cas, elles peuvent, elles aussi, comporter des erreurs et des omissions. Au-delà de la présence insuffisante des identifiants, l'information portée par certains enregistrements des sources peut être très imprécise, incomplète, ambigüe ou tronquée ;(2) la qualité des référentiels : les référentiels sont également porteurs d'erreurs, d'imprécisions, d'omissions. <br></br> Des objets peuvent en être absents. Les chaînes de caractères relatives au nommage des objets (entités, auteurs, projets, publications, brevets) peuvent être incomplètes, ambigües, tronquées, erronées. L'historique des objets dans les référentiels peut n'être que partiellement renseigné. Les référentiels peuvent évoluer avec retard par rapport à la réalité dont ils doivent rendre compte.",
      en: 'Three main factors of errors, inaccuracies and omissions influence the quality of scanR data: the quality of the processing performed by scanR, the quality of the sources and the quality of the repositories that describe the "objects" presented in scanR (entities, persons, projects, productions).\n <br></br> Even if scanR constantly adapts its methods and tools to limit its internal errors, newly identified difficulties, coding errors, unidentified features can lead to errors or omissions in the returned data.\nBut scanR errors can come from two other sources, independent of the information processing work performed by scanR: \n(1) Source quality: few sources mobilized by scanR systematically integrate an interoperable identifier. When this is the case, they may also contain errors and omissions. <br></br> Beyond the insufficient presence of identifiers, the information provided by some source records can be very imprecise, incomplete, ambiguous or truncated \n(2) the quality of the repositories. the repositories also contain errors, inaccuracies and omissions. Objects may be missing. Strings relating to the naming of objects (entities, persons, projects, productions) may be incomplete, ambiguous, truncated, erroneous. The history of objects in repositories may only be partially filled in. Repositories can evolve with delay in relation to the reality they must report on.',
    },
  },
  {
    key: "q11",
    groupkey: "search",
    icon: "fas fa-question-circle",
    label: {
      fr: "Comment affiner une recherche dans scanR avec des opérateurs ?",
      en: "How to refine a search in scanR with operators?",
    },
    definition: {
      fr: "scanR utilise le moteur de recherche <aES>Elasticsearch</aES>. Il est possible à l'utilisateur de construire une requête complexe pour générer des résultats plus adaptés à une question spécifique. Les opérateurs disponibles sont le '+' (et), le '-' (négation) et le '|' (ou). Par exemple, pour faire une recherche bilingue sur le changement climatique, la requête (changement+climatique) | (climate+change) pourra être utilisée. Concernant la négation, le '-' doit être placé directement avant le mot interdit, sans espace.",
      en: 'scanR uses the <aES >Elasticsearch</aES> search engine. It is possible for the user to build a complex query to generate results that are more relevant to a specific question.\nThe available operators are "+" (and), "-" ( negation) and "|" (or). For example, to do a bilingual research on climate change, the query (changement+climatique) | (climate+change) could be used. Concerning the negation, the "-" must be placed directly before the forbidden word, without space.',
    },
  },
  {
    key: "q12",
    groupkey: "search",
    icon: "fas fa-question-circle",
    label: {
      fr: "Comment sont ordonnés les résultats d'une recherche dans scanR ?",
      en: "How are the results of a search in scanR ordered?",
    },
    definition: {
      fr: "En réponse à une requête d'un utilisateur, scanR propose pour chaque type d'objets une liste ordonnée de résultats. A données identiques, cette liste est identique et indépendante du nombre de fois où cette requête est jouée. Elle est également indépendante des actions des utilisateurs à partir des résultats de cette requête. Cette liste n'est ainsi pas liée aux actions des utilisateurs. La liste des résultats est ordonnée, par défaut, par pertinence. C'est ainsi la fréquence d'apparition des termes de la requête pondérée par le type de document dans lesquels ils figurent qui détermine l'ordre d'apparition des résultats. <br></br>Les champs utilisés (classées par ordre d'importance décroissant) pour ordonner les résultats d'une requête sont propres à chaque type d' <b>objets</b> de scanR : <ul><li><h2>Structures</h2> identifiants, acronyme, noms, description, titres résumés et domaines des publications, titres des projets, acronyme des projets, titres des brevets, nom des accreditations, noms des prix, contenu du site web</li> <li><h2>Auteurs</h2> identifiants, nom complet, titres résumés et domaines des publications, domaines, affiliations récentes, noms des prix </li> <li><h2>Financements</h2> identifiant, nom, acronyme, description, domaines, nom de l'appel à projet, identifiant de l'appel à projet, nom de l'outil de financement, mots-clés, identifiants des publications, titres des publications, nom et identifiant des auteurs de publications, domaines des publications, noms acronymes et identifiants des participants </li><li><h2>Publications</h2> identifiants, titre, identifiants des auteurs, résumé, domaines, titre du journal, nom de l'éditeur, issn du journal, identifiants des affiliations, noms des affiliations, mentions de logiciel, contextes de mentions de logiciel, identifiants des financements, noms des financements, acronymes des financements </li> <li><h2>Brevets</h2> identifiants, codes des domaines cpc, titre, descriptions, domaines cpc </li></ul> ",
      en: "In response to a user request, scanR proposes an ordered list of results for each type of objects. With identical data, this list is identical and independent of the number of times this request is made. It is also independent of user actions based on the results of this request. Thus, this list is not linked to user actions. The list of results is ordered, by default, by relevance. Thus, it is the frequency of appearance of query terms weighted by the type of documents in which they appear that determines the order of appearance of the results. <br></br> The fields used (classified in descending order of importance) to order the results of a query are specific to each type of <b>objects</b> in scanR: <ul><li><h2>Organizations</h2> identifiers, acronym, names, description, summarized titles and publication domains, project titles, project acronym, patent titles, accreditation names, prize names, website content</li> <li><h2>Authors</h2> identifiers, full name, summarized titles and publication domains, domains, recent affiliations, prize names </li> <li><h2>Financing</h2> identifier, name, acronym, description, domains, project call name, project call identifier, funding tool name, keywords, publication identifiers, publication titles, name and identifier of publication authors, publication domains, names acronyms and identifiers of participants </li><li><h2>Publications</h2> identifiers, title, author identifiers, abstract, domains, journal title, publisher name, journal issn, affiliation identifiers, affiliation names, software mentions, software mention contexts, funding identifiers, funding names, funding acronyms </li> <li><h2>Patents</h2> identifiers, cpc domain codes, title, descriptions, cpc domains </li></ul> ",
    },
  },
  {
    key: "q13",
    groupkey: "search",
    icon: "fas fa-question-circle",
    label: {
      fr: "Sur la base de quelles informations le moteur de recherche de scanR fonctionne-t-il ?",
      en: "What information does the scanR search engine use?",
    },
    definition: {
      fr: "Le moteur de recherche de scanR indexe titres et résumés (si disponibles) des publications de recherche, thèses, monographies, ouvrages et brevets (mais pas les textes intégraux), les titres et résumés des financements sur appels à projets, les auteurs des publications, les inventeurs et déposants de brevets ainsi que le contenu des sites web qui ont pu être associés aux entités référencées dans scanR. Dans la mesure du possible, les partenaires internationaux des acteurs français de la recherche sont identifiés et associés à leurs partenaires français.",
      en: "The scanR search engine indexes titles and abstracts (if available) of research publications, PhD thesis, monographs, books and patents (but not full texts), titles and abstracts of funding on calls for proposals, authors of publications, inventors and patent applicants as well as the content of websites that may have been associated with the entities referenced in scanR. As far as possible, the international partners of French research actors are identified and associated with their French partners.",
    },
  },
  {
    key: "q14",
    groupkey: "entities",
    icon: "fas fa-question-circle",
    label: {
      fr: "Quelles sont les entités référencées dans scanR ?",
      en: "Which entities are referenced in scanR ?",
    },
    definition: {
      fr: "scanR couvre l'ensemble des structures de recherche actives référencées dans le répertoire national des structures de recherche (RNSR), leurs institutions de tutelle, les écoles doctorales en activité, les entreprises et autres institutions publiques qui ont pu être associées à au moins une source révélant une activité de recherche et ou d'innovation. Une institution peut ne pas être référencée dans scanR mais conduire une activité intense de recherche et d'innovation. Vous êtes dans cette situation, contactez-nous ?",
      en: "scanR covers all active research structures referenced in the National Directory of Research Structures (RNSR), their institutions of affiliation, active doctoral schools, companies and other public institutions that may have been associated with at least one source revealing research and/or innovation activity. An institution may not be listed in scanR but may carry out intensive research and innovation activities. You are in this situation and you want to be included in scanR, contact us?",
    },
  },
  {
    key: "q15",
    groupkey: "entities",
    icon: "fas fa-question-circle",
    label: {
      fr: "Pourquoi scanR comporte-il des doublons ?",
      en: "Why does scanR have duplicates?",
    },
    definition: {
      fr: "Malgré les efforts de scanR, des doublons peuvent de manière marginale exister. Une même entité ou une même production peut apparaitre ainsi plusieurs fois dans des résultats de recherche. Quelle est l'origine de cette situation ? \nLes différents acteurs de la recherche relèvent de structures de nature juridique variable, de niveaux de granularitées très différents. Ils relèvent de différents référentiels non mutuellement exclusifs. Une entité ou une production peut ainsi apparaître dans plusieurs référentiels. Dans la gestion de ces référentiels, scanR veille au maximum à éviter ces doublons et à identifier les zones de recouvrement. Cependant, leur détection est parfois complexe compte tenu des spécificités des différents référentiels d'où l'existence de certains doublons.\nVous en avez identifiés ? Dites le nous, nous ajusterons nos données ?",
      en: "Despite the efforts of scanR, duplicates may exist in a marginal way. The same entity or production may thus appear several times in search results. What is the origin of this situation? \nThe various research actors have different legal structures and very different levels of granularity. They are subject to different, not mutually exclusive, repositories. An entity or a production can thus appear in several repositories. In managing these repositories, scanR takes great care to avoid these duplicates and to identify overlapping areas. However, their detection is sometimes complex given the specificities of the different repositories.\nHave you identified any of them? Tell us, will we adjust our data?",
    },
  },
  {
    key: "q16",
    groupkey: "entities",
    icon: "fas fa-question-circle",
    label: {
      fr: "Pourquoi scanR n'utilise-t-il pas les annuaires des organismes de recherche, des universités et des écoles ?",
      en: "Why doesn't scanR use directories from research organizations, universities and other higher education and research institutions?",
    },
    definition: {
      fr: "scanR n'utilise pas les annuaires car ils ne sont pas rendus publics sous une forme exploitable par les institutions d'enseignement supérieur et de recherche. Pourtant, le Décret n° 2018-1117 du 10 décembre 2018 de la loi n° 2016-1321 du 7 octobre 2016 pour une République numérique prévoit, dans son article 1 premier alinea, une exception au principe général d'anonymisation pour \"les documents nécessaires à l'information du public relatifs aux conditions d'organisation de l'administration, notamment les organigrammes, les annuaires des administrations et la liste des personnes inscrites à un tableau d'avancement ou sur une liste d'aptitude pour l'accès à un échelon, un grade ou un corps ou cadre d'emplois de la fonction publique\".\nLes traitements réalisés par scanR verraient, avec l'utilisation de ce type d'information, leur efficacité considérablement progresser.",
      en: 'scanR does not use directories because they are not made public in a form that can be used by higher education and research institutions. However, Decree No. 2018-1117 of 10 December 2018 of Act No. 2016-1321 of 7 October 2016 Pour une République numérique provides, in its first paragraph of article 1, an exception to the general principle of anonymization for "documents necessary for informing the public about the conditions for organizing the administration, including organisation charts, administrative directories and the list of persons registered in a promotion table or on a list of suitable candidates for access to a specific position in the civil service".\nThe processing carried out by scanR would be more efficient with the use of this type of information.',
    },
  },
  {
    key: "q17",
    groupkey: "general",
    icon: "fas fa-question-circle",
    label: {
      fr: "Comment contribuer, proposer des modifications et contacter l'équipe scanR ?",
      en: "How to contribute, propose changes and contact the scanR team ?",
    },
    definition: {
      fr: "Deux solutions pour contribuer à l'amélioration de scanR : \n <ul><li>Vous avez identifié une erreur, une omission sur une fiche entité, auteur, production ou financement particulière ? Utilisez le bouton \"Contribuer\" pour nous contacter !\n </li> <li>Des remarques générales sur scanR, des idées de sources à intégrer, de propositions d'évolutions de l'interface, des envies de partenriats et de collaboration avec l'équipe ? Rendez-vous à la rubrique <aC>Contact</aC>. </li></ul>",
      en: 'Two solutions to contribute to the improvement of scanR: \n <ul><li> Have you identified an error or omission on a particular entity, author, production or funding record? Use the "Contribute" button to contact us !\n </li> <li>General remarks on scanR, ideas of sources to integrate, proposals for evolutions of the interface, desires of partnerships and collaboration with the team? Go to the <aC >Contact</aC> section.  </li></ul>',
    },
  },
  {
    key: "q18",
    groupkey: "projects",
    icon: "fas fa-question-circle",
    label: {
      fr: "Quels sont les financements recensés dans scanR ?",
      en: "What are the funding identified in scanR?",
    },
    definition: {
      fr: "scanR fédère les données issues des financements ANR, du programme des investissements d'avenir, des programmes européens de recherche et d'innovation (FP7, H2020 et Horizon Europe), du Programme hospitalier de recherche clinique, du Ministère en charge de la santé et des affaires sociales (PHRC), des partenariats Hubert Curien. Pour chacun des projets bénéficiant d'une subvention publique, scanR identifie les partenaires associés.",
      en: "scanR brings together data from ANR funding, the programme of future investments, the European research and innovation programmes (FP7 and H2020), the programmes of the Ministry of Agriculture and Food (CASDAR), the Hospital Clinical Research Programme, the Ministry of Health and Social Affairs (PHRC) and Hubert Curien partnerships. For each of the projects receiving public funding, scanR identifies, if possible, the associated partners.",
    },
  },
  {
    key: "q19",
    groupkey: "projects",
    icon: "fas fa-question-circle",
    label: {
      fr: "Pourquoi tous les financements publics sur appel à projet ne sont ils pas référencés ?",
      en: "Why are not all public funding referenced?",
    },
    definition: {
      fr: "En contradiction avec les termes de la loi n° 2016-1321 of 7 octobre 2016 Pour une République numérique, toutes les données sur les financements publics de la recherche sur appel à projet ne sont pas accessibles. scanR valorise et intègre toutes les données auxquelles il accède. <br></br>Dans certains cas, l'information est accessible via des bases de données ou des API mises à disposition par le producteur de la donnée.<br></br> Dans d'autres cas, scanR ne dispose que de l'information diffusée de manière ouverte sur le site web de l'institution en charge du financement. Si les résultats d'une agence de financement n'y figure pas c'est que scanR n'a pas identifié la source ouverte associée ou n'accède pas à ces données ou que, compte tenu de la qualité de l'information disponible, le coût de traitement de l'information accessible est trop élevé.",
      en: "In contradiction with the terms of Law n° 2016-1321 of 7 October 2016 Pour une République numérique, not all data on public funding of research on a call for projects are accessible. scanR values and integrates all the data it accesses.<br></br> In some cases, the information is accessible via databases or APIs made available by the data producer. <br></br>In other cases, scanR only has access to information that is openly disseminated on the website of the funding institution.\n If a funding agency's results are not included, it is because scanR does not access this data at all or, given the quality of the information available, the cost of processing is too high.",
    },
  },
  {
    key: "q20",
    groupkey: "projects",
    icon: "fas fa-question-circle",
    label: {
      fr: "Les contrats associant une équipe de la recherche publique et un partenaire (sans financement d'une agence publique comme l'ANR) sont-ils présents dans scanR ? ",
      en: "Are contracts involving a public research team and a partner (without funding from a public agency such as the ANR) present in scanR? ",
    },
    definition: {
      fr: "scanR ne présente encore que les projets de recherche bénéficiant d'une subvention publique dans le cadre d'un programme de financement. Les contrats bilatéraux associant directement un laboratoire de recherche et un tiers (entreprises, organisme ou service public) ne figurent pas dans scanR. scanR ne dispose pas de ce type de données non soumises aux obligations de transaprence sur les bénéficiaires de subvention publique.",
      en: "scanR only presents research projects that have received a public grant as part of a funding programme. Bilateral contracts directly involving a research laboratory and a third party (companies, organisations or public services) are not included in scanR. scanR does not have this type of data not subject to the transaprence obligations on beneficiaries of public subsidies.",
    },
  },
  {
    key: "q21",
    groupkey: "projects",
    icon: "fas fa-question-circle",
    label: {
      fr: "Comment faire apparaître dans scanR les financements d'une nouvelle agence de financement de la recherche, d'une collectivité territoriale, d'une fondation ou de tout autre institution publique ou privée ?",
      en: "How can the funding of a new research funding agency, a local authority, a foundation or any other public or private institution be included in scanR?",
    },
    definition: {
      fr: "Vous êtes une institution publique, un délégataire de service public, une fondation, ou toute institution, vous attribuez des fonds sur appel à projet ? Vous souhaitez rendre visible votre soutien aux acteurs de la recherche dans un souci de respect du Décret n° 2017-779 du 5 mai 2017 relatif à l'accès sous forme électronique aux données essentielles des conventions de subvention de la Loi n° 2016-1321 du 7 octobre 2016 pour une République numérique, de transparence à l'égard de vos donateurs ou de suivi des équipes soutenues ? Contactez nous et nous travaillerons ensemble pour intégrer les résultats de vos appels à projet dans scanR.",
      en: "Are you a public institution, a public service delegate, a foundation, or any other institution? Do you allocate funds on a call for projects?  Do you wish to make your support visible to research actors in order to comply with Decree No. 2017-779 of 5 May 2017 on access in electronic form to the essential data of the grant agreements of Law No. 2016-1321 of 7 October 2016 for a digital Republic? Do you want to make your support visible to research actors in order to enhance the value of your action, transparency towards your donors or follow-up of the teams supported?  Contact us and we will work together to integrate the results of your calls for projects into scanR.",
    },
  },
  {
    key: "q23",
    groupkey: "prizes",
    icon: "fas fa-question-circle",
    label: {
      fr: "Quelles sources sont utilisées pour les prix et distinctions?",
      en: "What sources are used for scientific awards?",
    },
    definition: {
      fr: "scanR constitue l'information sur les prix et distinctions sur la seule base d'un repérage manuel. Il est donc loin d'être exhaustif et ne couvre pas de manière uniforme suivant les thématiques de recherche.",
      en: "scanR constitutes information on scientific prizes on the sole basis of manual tracking. It is therefore far from exhaustive and does not cover in a uniform way according to the research themes.",
    },
  },
  {
    key: "q24",
    groupkey: "prizes",
    icon: "fas fa-question-circle",
    label: {
      fr: "Il manque certains prix et distinctions. Que faire ?",
      en: "Some scientific prizes are missing. What to do about it?",
    },
    definition: {
      fr: "Vous avez reçu un prix ou une distinction pour vos travaux de recherche mais scanR ne mentionne pas cette récompense ? Signalez-le nous [lien rubrique contact] et aidez nous à convaincre l'institution qui vous l'a décerné de verser régulièrement la liste de ses lauréats à scanR !\nVotre entreprise, fondation, association, institution publique décerne des prix et distinctions à des acteurs de la recherche ? Vous souhaitez apparaître dans scanR pour renforcer la reconnaissance de votre action au côté de la recherche française ? <aC> Contactez nous</aC>   !",
      en: "You have received a scientific prize but scanR does not mention this award? Please let us know[link to contact section] and help us convince the institution that awarded you to regularly send the list of its winners to scanR!\nDoes your company, foundation, association, public institution award prizes and distinctions to research actors? Would you like to appear in scanR to strengthen the recognition of your action alongside French research?  <aC> Contact us</aC>  !",
    },
  },
  {
    key: "q25",
    groupkey: "prizes",
    icon: "fas fa-question-circle",
    label: {
      fr: "Pourquoi la page de ma structure n'indique pas qu'une des personnes de la structure a obtenu un prix scientifique ?",
      en: "Why doesn't the page in my laboratory indicate that one of its researchers has received a scientific award?",
    },
    definition: {
      fr: "Les prix scientifiques attribués aux personnes sont référencés dans les pages \"Personnes\". Quand l'affiliation du lauréat au moment de l'attribution du prix est connue, scanR fait figurer le prix au niveau de l'institution d'affiliation. Malheureusement cette information n'est pas toujours disponible.",
      en: 'The scientific prizes awarded to individuals are listed in the "People" pages. When the winner\'s affiliation at the time of awarding the prize is known, scanR includes the prize at the level of the affiliated institution or lab. Unfortunately, this information is not always available.\n <aC> Contact us</aC>  !',
    },
  },
  {
    key: "q26",
    groupkey: "prizes",
    icon: "fas fa-question-circle",
    label: {
      fr: "Quels prix de thèse et prix scientifiques sont-ils référencés dans scanR ?",
      en: "Which thesis and scientific awards are referenced in scanR?",
    },
    definition: {
      fr: "En identifiant les prix e distinctions scientifiques, scanR souhaite mettre en lumière la qualité des travaux des chercheurs affiliés à des institutions françaises. scanR souhaite également valoriser le soutien apporté à la recherche et à l'innovation par les fondations et institutions récompensant régulièrement les chercheurs, jeunes ou confirmés, pour la qualité de leurs travaux. <br></br>Mais ces soutiens sont nombreux et dispersés. scanR en a identifié une infime partie compte tenu de ses ressources limitées. Ce repérage s'améliorera au fil du temps.\n <br></br>Vous attribuez des prix et récompenses à des travaux de recherche et d'innovation et vous ne figurez pas encore dans scanR ? <aC> Contactez nous</aC>   et travaillons ensemble à valoriser votre implication au côté de la recherche française !",
      en: "By identifying the scientific prizes, scanR wishes to highlight the quality of the work of researchers affiliated with French institutions. scanR also wishes to highlight the support provided to research and innovation by foundations and institutions that regularly reward young or experienced researchers for the quality of their work. <br></br>But these supports are numerous and scattered. scanR has identified a very small part of them given its limited resources. This tracking will improve over time.\nDo you award prizes and awards for research and innovation work? Are you not yet listed in scanR? <aC> Contact us</aC>  and let's work together to promote your involvement in French research!",
    },
  },
  {
    key: "q27",
    groupkey: "persons",
    icon: "fas fa-question-circle",
    label: {
      fr: "Quels auteurs  disposent d'un profil-auteur dans scanR ?",
      en: "Which authors have an author profile in scanR?",
    },
    definition: {
      fr: "Seuls les auteurs disposant d'un identifiant-auteur IdRef auxquel scanR a pu associer, avec un bon niveau de certitude, au moins une production disposent d'un profil-auteur dans scanR.",
      en: "Only authors with an IdRef author ID to whom scanR could associate, with a good level of certainty, at least one production have an author profile in scanR.",
    },
  },
  {
    key: "q28",
    groupkey: "persons",
    icon: "fas fa-question-circle",
    label: {
      fr: "Comment apparaître dans scanR ?",
      en: "How to appear in scanR?",
    },
    definition: {
      fr: "scanR ne comporte pas de fiche auteur à votre nom alors que vous publiez ? Communiquez-nous votre nom, votre Idref ainsi que la liste des DOI de vos travaux et nous ajouterons une fiche-auteur à votre nom ! <aC> Rendez-vous à la rubrique Contact ! </aC>  !",
      en: 'scanR does not have an author record in your name while you are publishing? Tell us your name, your Idref and the list of DOIs of your work and we will add an author profile to your name! <aC> Go to the "Contact page"</aC>  !',
    },
  },
  {
    key: "q29",
    groupkey: "persons",
    icon: "fas fa-question-circle",
    label: {
      fr: "Comment ne plus apparaître dans scanR ?",
      en: "How to stop appearing in scanR?",
    },
    definition: {
      fr: "Vous souhaitez ne plus figurer en tant qu'auteur dans scanR ? </br> Parce que scanR ne référence que trop peu de vos travaux ? Nous pouvons arranger cela ensemble. Sur votre page-auteur, cliquez sur 'lier des publications' et suggérez à scanR des publications à associer à votre page-auteur. Vous pouvez aussi signaler une erreur sur votre fiche-auteur ou nous communiquer des informations complémentaires permettant de l'améliorer (identifiant HAL, Orcid), cliquez sur 'signaler une erreur'. Nous ferons le nécessaire.  </br> Pour une toute autre raison, vous ne souhaitez plus faire apparaître votre profil-auteur dans scanR. Dans ce cas, nous supprimerons votre profil. Vos travaux resteront cependant accessibles via une recherche mais ils ne seront plus associés à un profil auteur à votre nom.",
      en: "Do you no longer want to have an author profile in scanR? \n- Because scanR only refers to too little of your work? We can arrange this together. Contact us by copying and pasting the scanR address of your page from your browser, give us the list of DOIs of your publications or their HAL identifier or the reference in SUDOC or in theses.fr. We will handle it. \n- For another reason, you no longer want your author profile to appear in scanR. In this case, we will delete your profile. However, your works will remain accessible via a search but they will no longer be associated with an author profile in your name.",
    },
  },
  {
    key: "q30",
    groupkey: "entities",
    icon: "fas fa-question-circle",
    label: {
      fr: "Entreprises issues ou liées aux laboratoires de recherche, que signifie la présence d'entreprises dans certains profils de laboratoire ?",
      en: "Companies from or related to research laboratories, what does the presence of companies in certain laboratory profiles mean ?",
    },
    definition: {
      fr: "Via différentes sources (iLab, universités et établissement d'enseignement supérieur et de recherche ou d'organismes, veille, ...), scanR identifie certaines entreprises créées par les personnels d'un laboratoire ou utilisant les connaissances et technologies qui y sont développées. Ce repérage n'est pas exhaustif et s'améliorera grâce à vos retours et signalements ! <aC> Contactez nous</aC>  !",
      en: "Via different sources (iLab, universities and higher education and research institutions or organizations, monitoring,...), scanR identifies certain companies created by laboratory staff or using the knowledge and technologies developed in a laboratory. This tracking is not exhaustive and will improve thanks to your feedback and reports! <aC> Contact us</aC>  !",
    },
  },
  {
    key: "q31",
    groupkey: "publications",
    icon: "fas fa-question-circle",
    label: {
      fr: "Quels est le périmètre des publications de recherche (articles, thèses, monographies) présenté dans scanR ?",
      en: "What is the scope of research publications (articles, theses, monographs) presented in scanR ?",
    },
    definition: {
      fr: "scanR indexe plusieurs types de publications : les thèses présentes dans theses.fr et soutenues depuis 1990 ; les publications publiées depuis 2013, disposant d'un DOI Crossref et dont au moins un auteur a une affiliation française ; les publications référencées dans HAL ; enfin sont aussi indexées les monographies extraites du SUDOC, publiées après 1960,  associées à au moins un auteur disposant d'un identifiant idref et référencé via les publications scientifiques ou les thèses. On estime que scanR dispose d'une bonne couverture des travaux de recherche à partir de 2013. La couverture est plus partielle avant 2013.",
      en: "scanR indexes several types of publications: PhD thesis present in theses.fr and defended since 1990; research publications published since 2013 and for which at least one author has a French affiliation (using data from the Open Science Barometer for publications with a DOI and HAL for others); finally, monographs extracted from SUDOC, published since 2013 and having a scientific or academic publisher are also indexed.",
    },
  },
  {
    key: "q32",
    groupkey: "productions",
    icon: "fas fa-question-circle",
    label: {
      fr: 'Que recouvre le terme "Productions" dans scanR ?',
      en: 'What means "Productions" in scanR?',
    },
    definition: {
      fr: "Sous le terme \"Productions\", scanR entend à ce jour les articles de recherche, les ouvrages et monographies, les thèses, les brevets, les logiciels. Pour l'ensemble de ces \"Productions\", scanR ne garantit pas l'exhaustivité du recensement mais veille à son amélioration continue. La qualité de ce référencement dépend du travail de l'équipe en charge de l'application mais également de la qualité et de l'exhaustivité des sources qui sont mobilisées.",
      en: 'By " Productions ", scanR means to date research articles, books and monographs, theses, patents, software. For all these "Productions", scanR does not guarantee the exhaustiveness of the census but ensures its continuous improvement. The quality of this referencing depends on the work of the team in charge of the application but also on the quality and exhaustiveness of the sources that are mobilized.',
    },
  },
  {
    key: "q33",
    groupkey: "productions",
    icon: "fas fa-question-circle",
    label: {
      fr: "Pourquoi certains travaux ne sont-ils pas présentés dans scanR ?",
      en: "Why are some research works not presented in scanR?",
    },
    definition: {
      fr: "scanR analyse toutes les publications avec un DOI crossref publiées depuis 2013 et n'affiche que celles dans lesquelles une affiliation française est détectée à partir de la page web de la publication. Par ailleurs les publications issues de HAL avec une affiliation française sont aussi indexées, ainsi que certaines monographie du SUDOC. Il est donc possible que certains travaux ne soient pas moissonnés et indexés, s'ils sont absents de nos sources ou si nous n'avons pas repéré d'affiliation française. Contactez-nous et nous travaillerons ensemble pour intégrer les travaux manquants.",
      en: "scanR analyzes all research publications with a DOI published since 2013 and only displays those where a French affiliation is detected from the publication's web page. In addition, publications from HAL with a French affiliation and published after 2013 are also indexed, as well as some SUDOC monographs, again since 2013, depending on the publisher (scientific or academic publisher). It is therefore possible that some works may not be harvested and indexed, if they are absent from our sources or if we have not identified a French affiliation. Contact us and we will work together to integrate the missing work.",
    },
  },
  {
    key: "q34",
    groupkey: "productions",
    icon: "fas fa-question-circle",
    label: {
      fr: 'Pourquoi toutes mes "Productions" ne sont-elles pas associées à mon profil-auteur ?',
      en: 'Why are not all my "Productions" associated with my author profile?',
    },
    definition: {
      fr: "Articles de recherche, ouvrages et monographies, thèses, brevets et logiciels sont référencés dans différentes sources (par exemple HAL, Sudoc, theses.fr, patstat, ...). Ces sources n'intègrent pas forcément ou pas encore systématiquement des identifiants permettant d'associer des travaux à un profil-auteur de manière non-ambigüe. Cette situation explique l'absence de certaines références dans vos travaux.\nscanR a réalisé d'importants travaux d'enrichissement sur les articles de recherche en introduisant l'identifiant auteur Idref de l'Abes. Mais de nombreuses difficultés compliquent cette tâche : des homonymies, des référentiels-auteurs incomplets, des sources proposant des données incomplètes ou de mauvaise qualité, ... Parallèlement, HAL, Archives ouvertes investit dans l'intégration d'identifiants-auteurs interopérables. L'Abes veille à fiabiliser et étendre la couverture de ses identifiants-auteurs (Idref) et à les rendre interopérables avec d'autres (ORCID, BNF, ARK, ISNI par exemple).\nAvec le temps, l'amélioration des systèmes d'information et surtout l'implication de tous, auteurs/scientifiques et professionnels de la gestion de l'information scientifique et technique, la situation ne peut que s'améliorer !",
      en: "Research articles, books and monographs, PhD thesis, patents and software are referenced in different sources (e. g. HAL, Sudoc, theses.fr, patstat,...). These sources do not necessarily or not yet systematically include identifiers that allow work to be associated with an author profile in a non-ambiguous way. This situation explains the absence of some references in your work.\nscanR has carried out important enrichment work on research articles by introducing the Idref de l'Abes author ID. But many difficulties complicate this task: homonymies, incomplete author-references, sources offering incomplete or poor quality data,... At the same time, HAL, Open Archives is investing in the integration of interoperable author-identifiers. The Abes ensures that its author identifiers (Idref) are reliable and extend their coverage and that they are interoperable with others (ORCID, BNF, ARK, ISNI for example).\nOver time, with the improvement of information systems and with especially the involvement of all, authors/scientists and professionals in the management of scientific and technical information, the situation can only improve!",
    },
  },
  {
    key: "q35",
    groupkey: "publications",
    icon: "fas fa-question-circle",
    label: {
      fr: "Comment est déterminé le statut d'ouverture d'une publication de recherche référencées dans scanR ?",
      en: "How is the open access status of a research publication referenced in scanR determined?",
    },
    definition: {
      fr: "Une thèse est réputée ouverte si un lien de téléchargement est proposé sur le site theses.fr. Pour une publication de recherche comportant un DOI, c'est le service Unpaywall qui détermine son statut d'ouverture en moissonnant régulièrement plusieurs dizaines de milliers d'entrepots de travaux en Open Access de par le monde. Le service proposé par Unpaywall permet de suivre dans le temps le statut d'ouverture. scanR actualise donc régulièrement cette information. Pour les travaux sans DOI référencés dans scanR, c'est HAL qui apporte cette information. Enfin, quand aucune source n'informe du statut d'ouverture d'une production, scanR considère que son accès est fermé.",
      en: "A thesis is considered open if a download link is provided on the theses.fr website. For a research publication with a DOI, it is the Unpaywall service that determines its opening status by regularly harvesting tens of thousands of Open Access work warehouses around the world. The service offered by Unpaywall allows you to track the opening status over time. scanR therefore regularly updates this information. For work without DOIs referenced in scanR, HAL provides this information. Finally, when no source informs about the opening status of a production, scanR considers that its access is closed.",
    },
  },
  {
    key: "q36",
    groupkey: "persons",
    icon: "fas fa-question-circle",
    label: {
      fr: "Mes publications sont référencées mais je n'ai pas de profil-auteur dans scanR. Comment changer cette situation ?",
      en: "My publications are referenced but I don't have an author profile in scanR. How can this situation be changed?",
    },
    definition: {
      fr: "scanR peut référencer une publication mais être dans l'incapacité de la relier à un profil-auteur. Homonymies et absence de profil dans les référentiels constituent les principales causes de cette situation. Si vous avez un homonyme, communiquez nous votre identifiant idref et, si possible, la liste des DOI de vos travaux (ou encore leur identifiants Sudoc) et nous ferons le nécessaire. Si vous ne disposez pas d'un identifiant Idref, adressez-vous à votre correspondant 'Information scientifique' en bibliothèque universitaire ou dans votre centre de documentation. Et pensez par la même occasion à créer votre identifiant-auteur international ORCID et à relier votre profil ORCID à votre nouvel identifiant Idref et à votre profil HAL !",
      en: 'scanR can reference a publication but be unable to link it to an author profile. Homonymies and lack of author-profile in the repositories are the main causes of this situation. \nIf you have a homonym, provide us with your idref identifier and, if possible, the list of DOIs for your work (or their Sudoc identifiers) and we will do the necessary.\nIf you do not have an Idref identifier, contact your correspondent "Scientific Information" in the university library or in your documentation centre. And at the same time, think about creating your international ORCID author ID and linking your ORCID profile to your new Idref ID!',
    },
  },
  {
    key: "q37",
    groupkey: "general",
    icon: "fas fa-question-circle",
    label: {
      fr: "Quels sont les référentiels d'entités utilisés dans scanR ?",
      en: "What are the entity repositories used in scanR?",
    },
    definition: {
      fr: "Pour couvrir l'ensemble des entités actives en matière de recherche et d'innovation en France, scanR s'appuie essentiellement sur 3 référentiels complémentaires : le Répertoire national des structures de recherche (RNSR) pour les laboratoires publics de recherche essentiellement, SIRENE pour les autres entités légales françaises et Grid pour les partenaires étrangers (déprécié d'ici à fin 2024 au profit de RoR).<br></br> La Base centrale des établissements est également mobilisée mais de manière beaucoup plus marginale pour les composantes des établissements d'enseignement supérieur qui n'ont pas d'existence juridique.",
      en: "To cover all entities active in research and innovation in France, scanR relies essentially on 3 complementary repositories: the Répertoire national des structures de recherche (RNSR) for public research laboratories, essentially, SIRENE for other French legal entities and Grid for foreign partners. <br></br> The Base centrale des établissements is also mobilized but in a much more marginal way for the sub-parts of higher education institutions that do not have a legal existence.\nAs these different repositories partially overlap, some scanR entities have different identifiers within these different repositories. At the margin, this partial recovery of the repositories leads to duplications that have not yet been detected. Help us find them by reporting them to us!",
    },
  },
  {
    key: "q38",
    groupkey: "general",
    icon: "fas fa-question-circle",
    label: {
      fr: "Puis-je réutiliser les données de scanR ?",
      en: "Can I reuse the scanR data?",
    },
    definition: {
      fr: "A l'exception des données crawlée sur les sites web des entités référencées dans scanR qui ne sont pas communicables, les données présentées dans scanR sont réutilisables librement selon les termes de la licence ouverte Etalab 2.0 [https://www.etalab.gouv.fr/licence-ouverte-open-licence]",
      en: "Except for data crawled on the websites of entities referenced in scanR which are not communicable, the data presented in scanR are freely reusable under the terms of the open license Etalab 2.0[https://www.etalab.gouv.fr/licence-ouverte-open-licence]",
    },
  },
  {
    key: "q39",
    groupkey: "general",
    icon: "fas fa-question-circle",
    label: {
      fr: "Sous quelles formes les données de scanR sont-elles accessibles ?",
      en: "In what formats are scanR data accessible?",
    },
    definition: {
      fr: "Les données présentées dans scanR sont accessibles de différentes manières. Des fonctions d'exportation sont associées aux graphiques et aux listes. Les données sont également accessibles via la plate-forme de données ouvertes proposées par le Ministère de l'enseignement supérieur et de la recherche (et indéxées sur le portail interministériel de données ouvertes https://www.data.gouv.fr). Elles sont proposées sous formes tabulaires, exportables sous différents formats (csv, xls, json essentiellement) ou mobilisables via des API. Enfin, scanR fonctionne grâce à un ensemble d'API qui sont publiquement exposées, voir la page <aOpendata>Open Data & API</aOpendata>. Ces API sont par ailleurs référencées sur https://api.gouv.fr/",
      en: "The data presented in scanR are accessible in different ways. Export functions are associated with graphics and lists. The data are also accessible via the open data platform proposed by the Ministry of Higher Education, Research and Innovation (and indexed on the inter-ministerial open data portail https://www.data.gouv.fr). They are available in tabular form, exportable in different formats (mainly csv, xls, json) or mobilized via APIs. Finally, scanR works with a set of APIs that are publicly exposed, cf <aOpendata>Open Data & API</aOpendata>. These APIs are also referenced on https://api.gouv.fr/",
    },
  },
  {
    key: "q40",
    groupkey: "entities",
    icon: "fas fa-question-circle",
    label: {
      fr: "Comment la section 'Equipe de direction' d'une fiche entité est alimentée dans scanR ?",
      en: "How is the 'Team' section of an entity record populated in scanR?",
    },
    definition: {
      fr: "L'équipe de direction des structures de recherche est identifiée grâce au Répertoire national des structures de recherche.",
      en: "The management team of the research structures is identified using the Répertoire national des structures de recherche (RNSR).",
    },
  },
  {
    key: "q41",
    groupkey: "persons",
    icon: "fas fa-question-circle",
    label: {
      fr: "Comment est construite la chronologie des affiliations d'une auteur ?",
      en: "How is the chronology of an author's affiliations constructed?",
    },
    definition: {
      fr: "scanR procède à une analyse automatisée des affiliations des auteurs mentionnées dans les publications qu'il couvre (la méthodologie est <aHal> présentée là </aHal> et le code est disponible sur <aGit> github</aGit>). Cette analyse permet dans de nombreux cas d'associer, par le biais de ses publications, un auteur et une structure pour une année ou une période donnée. C'est de cette façon que sont calculées les 'Affiliations récentes' de scanR. Des erreurs sont possibles mais scanR peut les corriger. <aC>Contactez-nous </aC>!",
      en: "scanR carries out an analysis of the affiliations of the authors mentioned in the productions it covers. This analysis makes it possible to associate an author, an affiliation and a year of publication. The completeness of the tracking depends on scanR's ability to associate free text on a production with an entity referenced in scanR. Errors are possible but scanR can correct them. <aC> Contact us</aC> ",
    },
  },
  {
    key: "q42",
    groupkey: "general",
    icon: "fas fa-question-circle",
    label: {
      fr: "scanR est-il exhaustif dans ses repérages ?",
      en: "Is scanR comprehensive in its tracking?",
    },
    definition: {
      fr: "L'information mobilisée dans scanR provient de multiples sources de qualité très hétérogène. Ces sources sont associées à des référentiels qui leur sont souvent propres. scanR met en oeuvre un ensemble de processus pour fédérer autour d' <b>Objets </b> précis (entités, projets, auteurs, production) un maximum d'informations relatives à l'activité de recherche et d'innovation et tisser des liens entre ces <b>Objets</b>. Il est impossible de garantir l'exhaustivité et l'absolue qualité des repérages et associations d' <b>Objets</b> réalisés dans scanR. Mais scanR cherche constamment à s'améliorer. Alors, aidez-nous à l'améliorer, signalez-nous les erreurs manifestes, les \"bizareries\" et autres bugs !",
      en: 'The information mobilized in scanR comes from multiple sources of very heterogeneous quality. These sources are often associated with their own repositories. scanR implements a set of processes to federate around specific <b>Objects</b> (entities, projects, persons, production) a maximum of information relating to the research and innovation activity and to establish links between these <b>Objects</b>. It is impossible to guarantee the completeness and absolute quality of the tracking and associations of <b>Objects</b> made in scanR. But scanR is constantly looking to improve. So, help us improve it, report obvious errors, "weird" and other bugs!',
    },
  },
  {
    key: "q43",
    groupkey: "general",
    icon: "fas fa-question-circle",
    label: {
      fr: "scanR utilise-t-il des informations issues de bases de données commerciales ?",
      en: "Does scanR use information from commercial databases?",
    },
    definition: {
      fr: "<b>Non</b>, scanR ne mobilise que des sources ouvertes. scanR ne rediffuse aucune information issue de bases de données commerciales. scanR n'utilise dans ses processus d'enrichissement et de nettoyage de l'information aucune information issue de bases de données commerciales.",
      en: "<b>No</b>, scanR only uses open sources. scanR does not redistribute any information from commercial databases. scanR does not use any information from commercial databases in its enrichment and cleaning processes.",
    },
  },
  {
    key: "q44",
    groupkey: "general",
    icon: "fas fa-question-circle",
    label: {
      fr: "Quelle est la place des informations issues des sites web des entités dans scanR ?",
      en: "What is the place of information from entities' websites in scanR?",
    },
    definition: {
      fr: "L'information extraite des sites web permet d'alimenter le moteur de moteur de recherche en complément des informations issues de bases de données. Cette méthode permet notamment de remonter dans les résultats de recherche des entités pour lesquelles aucune ou peu d'information est disponible, mais dont le site web mentionne les mots clé de recherche. <br></br>Elle permet également de proposer un service de recherche plus réactif dans la mesure où les sites web mentionnent des événements qui n'apparaissent pas ou avec retard dans les productions de l'entité.",
      en: "The information extracted from the websites is used to feed the search engine engine in addition to the information from databases. This method makes it possible to retrieve in the search results entities for which no or little information is available, but whose website mentions the key search words. <br></br>It also makes it possible to offer a more responsive search service insofar as websites mention events that do not appear or with delay in the entity's productions.",
    },
  },
  {
    key: "q45",
    groupkey: "patents",
    icon: "fas fa-question-circle",
    label: {
      fr: "Qu'entend-on par invention ?",
      en: "What do we mean by invention?",
    },
    definition: {
      fr: "Les inventions correspondent ici aux familles de brevets simples au sens de l’OEB. Une famille de brevets simple est une collection de dépôts de brevets considérés comme couvrant une seule invention : leur contenu technique est réputé identique et ils ont tous exactement les mêmes priorités.\nEn effet, un brevet ne protégeant que sur un territoire déterminé, il est nécessaire de déposer une demande de brevet dans toutes les juridictions où l'on souhaite être protégé. Des procédures facilitent la démarche, mais au final elles donnent lieu à un ensemble de dépôts dans divers offices nationaux ou régionaux, que l'on regroupe dans ce que l'on appelle la famille de brevets.\n<aEpo>En savoir plus sur les familles de brevets</aEpo>",
      en: "The inventions here mean EPO’s simple patent families. A simple patent family is a collection of patent documents that are considered to cover a single invention : their technical content is considered to be identical and they all have exactly the same priorities.\nIndeed, patent protection is territorial and inventors and investors may have to seek protection in various different jurisdictions. Procedures facilitate the process, but ultimately they give rise to a set of filings in various national or regional offices, which are grouped in what is called the patent family.\n<aEpo>Learn more about patent families</aEpo>",
    },
  },
  {
    key: "q46",
    groupkey: "patents",
    icon: "fas fa-question-circle",
    label: {
      fr: "Pourquoi des participants apparaissent en doublon pour une même invention ?",
      en: "Why there is sometimes duplication between participants ?",
    },
    definition: {
      fr: "Les données concernant les déposants et inventeurs sont issues de sources hétérogènes émanant de divers offices et souvent traduites à partir de la langue d'origine de dépôt. Un effort important a été consacré à la normalisation des noms de participants, mais des doublons peuvent persister.",
      en: "The data concerning applicants and inventors come from heterogeneous sources from various offices and often translated from the original language of the application. Significant effort has been devoted to standardizing the names of participants, but duplicates may persist.",
    },
  },
  {
    key: "q47",
    groupkey: "patents",
    icon: "fas fa-question-circle",
    label: {
      fr: "Quelle est la différence entre un brevet et un dépôt de brevet ?",
      en: "What is the difference between patent and patent application ?",
    },
    definition: {
      fr: "Un dépôt de brevet ou demande de brevet est une demande visant à protéger une invention par un brevet. Elle peut être déposée auprès de l’INPI, de l'OEB ou d'un autre office de brevets. Un brevet est un titre juridique qui confère à un inventeur le droit d'empêcher autrui de fabriquer, d'utiliser ou de vendre son invention sans son consentement dans les pays pour lesquels le brevet a été délivré. Ce droit n'est accordé que pour une durée limitée (en général 20 ans). Sont répertoriés dans scanR tous les dépôts de brevets publiés, qu'ils aient donné lieu à une délivrance ou non.",
      en: "A patent application is a request for patent protection for an invention filed with the EPO or other patent office. A patent is a form of intellectual property that gives inventors the right, for a limited period (usually 20 years), to prevent others from making, using or selling their invention without their permission in the countries for which the patent has been granted. All published patent applications are listed in scanR, whether or not they have been granted.",
    },
  },
  {
    key: "q48",
    groupkey: "patents",
    icon: "fas fa-question-circle",
    label: {
      fr: "A quoi correspond la date de premier dépôt d'une invention ?",
      en: "What is the date of the first filing of an invention?",
    },
    definition: {
      fr: "La date de premier dépôt d'une invention correspond à la date de dépôt de demande de brevet la plus ancienne parmi tous les dépôts de la famille de brevets.",
      en: "The first filing date of an invention is the earliest patent filing date of all the family's applications.",
    },
  },
  {
    key: "q49",
    groupkey: "patents",
    icon: "fas fa-question-circle",
    label: {
      fr: "A quoi correspond la date de première publication d'une invention ?",
      en: "What is the date of the first publication of an invention?",
    },
    definition: {
      fr: "La date de première publication d'une invention correspond à la date où l'invention a été publiée et donc rendue publique pour la première fois. Cette publication intervient en général 18 mois après le premier dépôt.",
      en: "The first publication date of an invention corresponds to the date on which the invention was published and therefore made public for the first time. This publication generally takes place 18 months after the first filing date.",
    },
  },
  {
    key: "q50",
    groupkey: "patents",
    icon: "fas fa-question-circle",
    label: {
      fr: "Pourquoi je ne trouve pas mon brevet dans scanR ? Quel est le périmètre ?",
      en: "Why can't I find my patent in scanR ? What is the scope ?",
    },
    definition: {
      fr: "Le périmètre des brevets dans scanR correspond à toutes les demandes de propriété industrielle rattachées aux familles simples comprenant au moins un dépôt de brevet avec déposant français et dont la date de premier dépôt est postérieure au 1er janvier 2010. Les données relatives aux brevets sont actualisées deux fois par an en février et septembre.",
      en: "The scope of patents in scanR corresponds to all requests for industrial property titles attached to simple families comprising at least one patent application with a French applicant and whose date of first filing is after January 1, 2010. The latest updates concern the applications published on 07/25/2019.",
    },
  },
  {
    key: "q51",
    groupkey: "patents",
    icon: "fas fa-question-circle",
    label: {
      fr: "A quoi correspond la liste des dépôts de brevets ?",
      en: "What is the list of patent applications ?",
    },
    definition: {
      fr: "La liste des dépôts de brevets représente toutes les demandes de protection déposées concernant l'invention appartenant à la même famille de brevets (cf <aQ45> « Qu’entend-on par invention? » </aQ45>) : les dépôts nationaux mais aussi les dépôts internationaux par la procédure du PCT (Patent Cooperation Treaty) ainsi que les dépôts régionaux. Diverses informations sont disponibles concernant ces dépôts : les offices de dépôt, le code et la date de dépôt, la date de délivrance du brevet s’il y a lieu, le type de propriété industrielle (dans certaines familles il y a eu des demandes de protection sous d'autres formes que le brevet d'invention), ainsi que l'information concernant la priorité ou non au sein de la famille de dépôts. D'autres informations plus détaillées et à jour sur l'aspect juridique de la demande en question sont disponibles en suivant le lien affiché vers sa fiche Espacenet. Espacenet est un service de l'OEB qui offre un accès gratuit aux informations relatives aux inventions et aux développements techniques de 1782 à nos jours.",
      en: "The list of patent applications represents all the industrial property titles applications filed concerning the invention belonging to the same family of patents (cf. <aQ45> What do we mean by invention? </aQ45>): National applications but also international applications by the PCT (Patent Cooperation Treaty) procedure as well as regional applications. Various information is available concerning these filings : the filing offices, the code and the date of filing, the granted patent date if so, the type of industrial property title (in some families there have been requests for protection in other forms than the patent), as well as information concerning priority or not within the family of applications. Other more detailed and up-to-date information on the legal aspect of the request is available by following the link displayed towards its Espacenet file. Espacenet is a service of the EPO which offers free access to information relating to inventions and technical developments from 1782 to the present day.",
    },
  },
  {
    key: "q52",
    groupkey: "patents",
    icon: "fas fa-question-circle",
    label: {
      fr: "Quelles sont les sources utilisées pour les brevets ?",
      en: "What sources are used for patents?",
    },
    definition: {
      fr: "Deux sources sont utilisées pour alimenter les données sur les dépôts de brevets : la base de données Patstat de l'OEB ( Organisation européenne des brevets) et les données de l'INPI (Institut National de la Propriété Industrielle).\nPATSTAT contient des données bibliographiques sur plus de 100 millions de documents brevets provenant de grands pays industrialisés et en développement. Ces données sont extraites des base de données de l'OEB.\nLes données source de l'INPI proviennent quant à elles des fichiers XML de création et mise à jour des dossiers de dépôts de brevets à l'INPI ainsi que des fichiers de traductions en français des résumés de demandes de brevets déposés à l'OEB en anglais ou allemand.",
      en: "Two sources are used to provide data on patent filings: the EPO Patstat database (European Patent Office) and the INPI (National Institute of Industrial Property) data. \nPATSTAT contains bibliographical data relating to more than 100 million patent documents from leading industrialised and developing countries. It also includes the legal status data from more than 40 patent authorities contained in the EPO worldwide legal status database.\nThe INPI's source data comes from XML files for creating and updating patent applications at INPI as well as French translation files for abstract of patent applications filed at the EPO in English or German.",
    },
  },
  {
    key: "q53",
    groupkey: "patents",
    icon: "fas fa-question-circle",
    label: {
      fr: "Qu'est-ce qu'une priorité ?",
      en: "What is a priority?",
    },
    definition: {
      fr: "Le déposant d’une demande de brevet dispose d’un droit de priorité. Ce droit éphémère doit être exercé dans un délai d’un an à compter du dépôt de la première demande. Il permet à un déposant de déposer une autre demande pour la même invention en réclamant la priorité de la première demande. Si la demande de priorité est validée, la date de dépôt de la première demande est considérée comme la date effective de dépôt de la deuxième demande.",
      en: "The patent applicant has a right of priority . This temporary right must be exercised within the time-limit of twelve months after the first filing. It allows an applicant to file another application for the same invention by claiming the priority of the first application. If the priority request is validated, the filing date of the first application is considered to be the effective filing date of the second application.",
    },
  },
  {
    key: "q54",
    groupkey: "patents",
    icon: "fas fa-question-circle",
    label: {
      fr: "Quelles sont les différences entre demandes de brevets nationaux ou régionaux et demande internationale ?",
      en: "What are the differences between national or regional patent applications and international application?",
    },
    definition: {
      fr: "Une demande de brevet nationale est effectuée au sein d'un office national et délivre des brevets  protégeant sur le territoire national.\nLe PCT est un traité international qui compte plus de 150 États contractants. Ce traité permet d’obtenir simultanément la protection d’une invention dans un grand nombre de pays en déposant une demande “internationale” unique au lieu de déposer plusieurs demandes de brevet nationales ou régionales distinctes. La délivrance des brevets reste sous le contrôle des offices de brevets nationaux ou régionaux dans ce qu’il est convenu d’appeler la “phase nationale”.\nUne demande régionale est une demande effectuée auprès d'un office régional : la demande peut être effectuée directement auprès de l'office régional ou bien elle est faite par désignation lors de la procédure du PCT.\n<aWipo>En savoir plus sur la procédure PCT</aWipo>",
      en: "A national patent application is filed at a national office and grants patents protecting on the national territory.\nThe PCT is an international treaty with more than 150 Contracting States. The PCT makes it possible to seek patent protection for an invention simultaneously in a large number of countries by filing a single “international” patent application instead of filing several separate national or regional patent applications. The granting of patents remains under the control of the national or regional patent Offices in what is called the “national phase”.\nA regional application is an application filed with a regional office: the application may be filed directly with the regional office or it may be filed by designation during the PCT procedure.\n<aWipo>Learn more about the International Patent System</aWipo>",
    },
  },
  {
    key: "q55",
    groupkey: "projects",
    icon: "fas fa-question-circle",
    label: {
      fr: "Qu'est-ce que le programme H2020 ?",
      en: "What is the H2020 program?",
    },
    definition: {
      fr: "Horizon Europe est le programme-cadre de l'Union européenne pour la recherche et l'innovation pour la période allant de 2021 à 2027. Horizon Europe prend ainsi la suite du programme Horizon 2020, qui s'est terminé à la fin de l'année 2020. Il est doté d'un budget d'environ 95,5 milliards d'euros pour 2021-2027 (prix courants). Le programme-cadre Horizon Europe repose sur quatre piliers : La science d'excellence ; Les problématiques mondiales et la compétitivité industrielle européenne ; L'Europe plus innovante ; Élargir la participation et renforcer l'espace européen de la recherche.",
      en: 'H2020 is the European programme to support Research, Development and Innovation (RDI). It integrates the former FP7, the European Institute of Innovation and Technology and the innovation actions of the Competitiveness and Innovation Framework Programme (CIP). It is mainly structured around 3 main "Pillars": "Scientific excellence" oriented more fundamental research, "Industrial primacy" and "Societal challenges" oriented more applicative. It is implemented mainly through collaborative and European projects, but it is possible for innovative SMEs to obtain individual financing.\nThe H2020 programme has a budget of €80 billion for the period 2014 - 2020\n<aB >Learn more about H2020</aB> \n<aWp >Learn more about Work Programmes</aWp>',
    },
  },
  {
    key: "q56",
    groupkey: "search",
    icon: "fas fa-question-circle",
    label: {
      fr: "Comment bien formuler une requête dans le moteur de recherche ?",
      en: "How to properly formulate a query in the search engine?",
    },
    definition: {
      fr: "Le moteur de recherche indexe le contenu des différents objets de scanR. Ce contenu, suivant les sources et les objets peut-être en français ou en anglais. Il est donc recommandé, notamment pour les recherches liées à une thématique, d'effectuer une recherche bilingue. Cela peut se faire grâce à l'opérateur \"|\" (ou) (cf FAQ <aQ11> Comment affiner une recherche avec des opérateurs ? </aQ11>)",
      en: 'The search engine indexes the content of the different scanR objects. This content, depending on the sources and objects, may be in French or English. It is therefore recommended, particularly for research related to a theme, to conduct a bilingual research. This can be done using the operator "|" (or) (see question <aQ11> How to refine a search with operators? </aQ11>)',
    },
  },
  {
    key: "q57",
    groupkey: "networks",
    icon: "fas fa-question-circle",
    label: {
      fr: "Qu'est-ce qu'un réseau ?",
      en: "What is a network ?",
    },
    definition: {
      fr: "Un réseau, également appelé graphe en <aWikiGraphFr>théorie des graphes</aWikiGraphFr> est une structure composée d’objets et de relations entre ces objets. Généralement ils sont représentés par un ensemble de points (appelés nœuds) reliés entre eux par des lignes (arêtes). <br></br>Le nombre total de nœuds d’un réseau est appelé son ordre. Les arêtes peuvent avoir des poids pour indiquer l'importance ou la force de la relation entre les nœuds qu'elles relient. Le degré d'un nœud se réfère au nombre d'arêtes qui lui sont connectées, tandis que le poids d'un nœud est la somme des poids des arêtes qui lui sont associées. Une composante est un sous-ensemble d’un réseau qui n’est relié à aucun autre sous-ensemble du réseau. ",
      en: "A network, also known as a graph in <aWikiGraphEn>graph theory</aWikiGraphEn>, is a structure composed of objects and their relationships. Generally, they are represented by a set of points (called nodes) connected by links (edges). The total number of nodes in a network is called its order. Edges may have weights to indicate the importance or strength of the relationship between the nodes they connect. The degree of a node refers to the number of edges connected to it, while the weight of a node is the sum of the weights of the edges associated with it. A component is a subset of a network that is not connected to any other subset of the network.",
    },
  },
  {
    key: "q58",
    groupkey: "networks",
    icon: "fas fa-question-circle",
    label: {
      fr: "Comment sont construits les réseaux scanR ?",
      en: "How are scanR networks built?",
    },
    definition: {
      fr: "Les réseaux sont construits à partir des publications de recherche de scanR. <ul><li> <h3>Collecte des publications</h3> scanR recherche toutes les publications liées à une requête spécifique de l'utilisateur.</li> <li><h3>Agrégation des publications</h3> Les publications obtenues sont agrégées en fonction du modèle de réseau : <ul><li><b>Modèle 'Auteurs' </b><br></br> Les nœuds représentent les auteurs, et les arêtes indiquent le nombre de co-publications entre deux auteurs. </li> <li><b>Modèle 'Etablissements' </b><br></br> Les nœuds représentent les établissements, et les arêtes représentent le nombre de co-publications entre deux établissements. </li> <li><b>Modèle 'Laboratoires' </b><br></br>  Les nœuds représentent les laboratoires, et les arêtes indiquent le nombre de co-publications entre deux laboratoires. </li> <li><b>Modèle 'Thématiques' </b><br></br> Les nœuds représentent les thématiques, et les arêtes indiquent le nombre de co-publications entre deux thématiques. </li> <li><b>Modèle 'Logiciels' </b><br></br> Les nœuds représentent les logiciels, et les arêtes représentent le nombre de co-publications entre deux logiciels. </li> <li><b>Modèle 'Projets' </b><br></br> Les nœuds représentent des projets, et les arêtes représentent le nombre de co-publications entre deux projets. </li> <li><b>Modèle 'Pays' </b><br></br> Les nœuds représentent les pays, et les arêtes représentent le nombre de co-publications entre deux pays. </li> </ul></li> <li><h3>Filtrage des données</h3>  Pour assurer la pertinence du réseau, scanR filtre les nœuds pour ne conserver que les plus pertinents, limitant un réseau aux 300 nœuds les plus importants et/ou aux 5 composantes principales au maximum. </li></ul>",
      en: "The networks are built from research publications from scanR. <ul><li> <h3>Collection of publications</h3> scanR searches for all publications related to a specific user query.</li> <li><h3>Aggregation of publications</h3> The obtained publications are aggregated according to the network model: <ul><li><b>'Authors' model</b><br></br> Nodes represent authors, and edges indicate the number of co-publications between two authors.</li> <li><b>'Institutions' model</b><br></br> Nodes represent institutions, and edges represent the number of co-publications between two institutions.</li> <li><b>'Structures' model</b><br></br> Nodes represent laboratories, and edges indicate the number of co-publications between two laboratories.</li> <li><b>'Themes' model</b><br></br> Nodes represent themes, and edges indicate the number of co-publications between two themes.</li> <li><b>'Software' model</b><br></br> Nodes represent software, and edges represent the number of co-publications between two software.</li> <li><b>'Projects' model</b><br></br> Nodes represent projects, and edges represent the number of co-publications between two projects.</li> <li><b>'Countries' model</b><br></br> Nodes represent countries, and edges represent the number of co-publications between two countries.</li></ul></li> <li><h3>Data Filtering</h3> To ensure the relevance of the network, scanR filters the nodes to keep only the most relevant ones, limiting a network to the top 300 most important nodes and/or up to 5 main components at maximum. </li></ul>",
    },
  },
  {
    key: "q59",
    groupkey: "networks",
    icon: "fas fa-question-circle",
    label: {
      fr: "Que représentent les communautés ?",
      en: "What do communities represent ?",
    },
    definition: {
      fr: "En <aWikiGraphFr>théorie des graphes</aWikiGraphFr>, une communauté correspond à un ensemble de nœuds dans un graphe qui sont fortement interconnectés entre eux, tout en étant moins connectés avec les nœuds situés à l'extérieur de cette communauté. Les communautés peuvent être identifiées dans le but de comprendre la structure et les motifs sous-jacents du graphe, ainsi que pour analyser les relations et les interactions entre les entités qui le composent.<br></br> Pour identifier les communautés nous utilisons <aWikiLouvainFr> la méthode de Louvain </aWikiLouvainFr>.  Cet algorithme fonctionne en optimisant une mesure de modularité qui évalue la force des communautés dans un graphe. Plus précisément, Louvain cherche à maximiser la modularité en déplaçant progressivement les nœuds d'un graphe dans des communautés différentes, de manière itérative.<br></br> À chaque étape, il fusionne les communautés voisines si cela conduit à une amélioration de la modularité globale du graphe. Ce processus itératif se poursuit jusqu'à ce qu'aucun mouvement supplémentaire ne puisse augmenter la modularité.",
      en: "In <aWikiGraphEn>graph theory</aWikiGraphEn>, a community corresponds to a set of nodes in a graph that are strongly interconnected with each other, while being less connected to nodes outside of this community. Communities can be identified in order to understand the structure and underlying patterns of the graph, as well as to analyze the relationships and interactions between the entities that compose it.<br></br> To identify communities, we use <aWikiLouvainEn> the Louvain method </aWikiLouvainEn>. This algorithm works by optimizing a measure of modularity that evaluates the strength of communities in a graph. More precisely, Louvain seeks to maximize modularity by progressively moving nodes in a graph to different communities, iteratively.<br></br> At each step, it merges neighboring communities if it leads to an improvement in the overall modularity of the graph. This iterative process continues until no further movement can increase modularity.",
    },
  },
  {
    key: "q60",
    groupkey: "networks",
    icon: "fas fa-question-circle",
    label: {
      fr: "Comment sont nommées les communautés ?",
      en: "How are the communities named ?",
    },
    definition: {
      fr: "Pour nommer les communautés nous utilisons de l'IA générative de <aMistral>Mistral AI</aMistral> (modèle 'open-mistral-7b'). <br></br> Les noms sont obtenus à partir des principales thématiques des publications collectées pour chaque communauté. <br></br> Dans un souci de performance nous nous limitons pour le moment aux 2000 publications les plus pertinentes (par rapport à la recherche de l'utilisateur) pour chaque communauté. ",
      en: "To name the communities, we use generative AI from <aMistral>Mistral AI</aMistral> (model 'open-mistral-7b'). <br></br> The names are derived from the main themes of the publications collected for each community. <br></br> For performance reasons, we are currently limiting ourselves to the 2,000 most relevant publications (in relation to the user's search) for each community. ",
    },
  },
  {
    key: "q61",
    groupkey: "networks",
    icon: "fas fa-question-circle",
    label: {
      fr: "Qu'est-ce que VOSviewer ?",
      en: "What is VOSviewer ?",
    },
    definition: {
      fr: "<aVos>VosViewer</aVos> est un logiciel développé par <aCWTS>CWTS</aCWTS> (<aLeiden>Université de Leiden</aLeiden>), spécialisé dans la visualisation et l'analyse de réseaux, particulièrement utilisé dans le domaine de la recherche scientifique.<br></br> Nous utilisons cet outil pour visualiser les réseaux de manière interactive, offrant ainsi une compréhension approfondie des structures et des tendances au sein de vastes ensembles de données bibliographiques.",
      en: "<aVos>VOSviewer</aVos> is a software developed by <aCWTS>CWTS<aCWTS> (<aLeiden>Leiden University</aLeiden>), specialising in the visualisation and analysis of networks, particularly used in the field of scientific research. We use this tool to visualise networks interactively, providing a thorough understanding of structures and trends within large bibliographic datasets.",
    },
  },
  {
    key: "q63",
    groupkey: "networks",
    icon: "fas fa-question-circle",
    label: {
      fr: "Qu'est-ce qu'un diagramme stratégique (quadrant de Callon) ?",
      en: "What is a strategic diagram (Callon quadrant)?",
    },
    definition: {
      fr: "Le diagramme stratégique, également connu sous le nom de quadrant de Callon, est un outil d'analyse bibliométrique permettant de positionner les communautés d'un réseau selon deux axes : la <b>centralité</b> (axe horizontal) et la <b>densité</b> (axe vertical).<br></br> Ce diagramme divise l'espace en quatre quadrants permettant d'identifier le rôle stratégique de chaque communauté dans le réseau : les thèmes moteurs, les thèmes de niche, les thèmes basiques et transversaux, et les thèmes émergents ou en déclin.<br></br> Cette visualisation aide à comprendre la structure thématique d'un domaine de recherche et son évolution.",
      en: "The strategic diagram, also known as the Callon quadrant, is a bibliometric analysis tool used to position network communities along two axes: <b>centrality</b> (horizontal axis) and <b>density</b> (vertical axis).<br></br> This diagram divides the space into four quadrants to identify the strategic role of each community in the network: motor themes, niche themes, basic and transversal themes, and emerging or declining themes.<br></br> This visualization helps understand the thematic structure of a research field and its evolution.",
    },
  },
  {
    key: "q64",
    groupkey: "networks",
    icon: "fas fa-question-circle",
    label: {
      fr: "Comment sont calculées la densité et la centralité des communautés ?",
      en: "How are community density and centrality calculated?",
    },
    definition: {
      fr: "Pour chaque communauté, nous calculons deux métriques clés :<br></br><ul><li><b>Densité</b> : mesure la cohésion interne d'une communauté. Elle correspond à la somme des poids des liens internes entre les nœuds de la communauté. Une densité élevée indique que les membres de la communauté sont fortement interconnectés entre eux.</li><li><b>Centralité</b> : mesure l'importance d'une communauté dans le réseau global. Elle correspond à la somme des poids des liens externes qui connectent la communauté aux autres nœuds du réseau. Une centralité élevée indique que la communauté occupe une position centrale et est bien connectée au reste du réseau.</li></ul><br></br>Ces métriques sont normalisées (mise à l'échelle min-max) pour permettre une comparaison équitable entre communautés de tailles différentes.",
      en: "For each community, we calculate two key metrics:<br></br><ul><li><b>Density</b>: measures the internal cohesion of a community. It corresponds to the sum of weights of internal edges between nodes within the community. A high density indicates that community members are strongly interconnected with each other.</li><li><b>Centrality</b>: measures the importance of a community in the overall network. It corresponds to the sum of weights of external edges connecting the community to other nodes in the network. A high centrality indicates that the community occupies a central position and is well connected to the rest of the network.</li></ul><br></br>These metrics are normalized (min-max scaling) to allow a fair comparison between communities of different sizes.",
    },
  },
  {
    key: "q65",
    groupkey: "networks",
    icon: "fas fa-question-circle",
    label: {
      fr: "Comment interpréter les quatre quadrants du diagramme stratégique ?",
      en: "How to interpret the four quadrants of the strategic diagram?",
    },
    definition: {
      fr: "Le diagramme stratégique est centré sur les médianes de centralité et de densité, ce qui divise naturellement l'espace en quatre quadrants :<br></br><ul><li><h3>Thèmes moteurs (en haut à droite)</h3>Haute centralité, haute densité. Ces thèmes sont à la fois bien développés en interne et centraux dans le réseau. Ils représentent les axes de recherche principaux et structurants du domaine.</li><li><h3>Thèmes de niche ou isolés (en haut à gauche)</h3>Basse centralité, haute densité. Ces thèmes sont très développés en interne mais peu connectés au reste du réseau. Ils peuvent représenter des domaines spécialisés ou des thématiques périphériques bien établies.</li><li><h3>Thèmes émergents ou en déclin (en bas à gauche)</h3>Basse centralité, basse densité. Ces thèmes sont peu développés et peu connectés. Ils peuvent correspondre à des sujets émergents en cours de structuration ou à des thématiques en déclin.</li><li><h3>Thèmes basiques et transversaux (en bas à droite)</h3>Haute centralité, basse densité. Ces thèmes sont centraux dans le réseau mais moins développés en interne. Ils constituent souvent des fondements méthodologiques ou des thèmes transversaux qui irriguent plusieurs domaines.</li></ul>",
      en: "The strategic diagram is centered on the medians of centrality and density, which naturally divides the space into four quadrants:<br></br><ul><li><h3>Motor themes (top right)</h3>High centrality, high density. These themes are both well-developed internally and central in the network. They represent the main and structuring research axes of the field.</li><li><h3>Niche or isolated themes (top left)</h3>Low centrality, high density. These themes are highly developed internally but poorly connected to the rest of the network. They may represent specialized domains or well-established peripheral topics.</li><li><h3>Emerging or declining themes (bottom left)</h3>Low centrality, low density. These themes are underdeveloped and poorly connected. They may correspond to emerging subjects in the process of structuring or to declining themes.</li><li><h3>Basic and transversal themes (bottom right)</h3>High centrality, low density. These themes are central in the network but less developed internally. They often constitute methodological foundations or cross-cutting themes that permeate several domains.</li></ul>",
    },
  },
  {
    key: "q62",
    groupkey: "organizations",
    icon: "fas fa-question-circle",
    label: {
      fr: "Comment est générée la description par IA ?",
      en: "How is the IA description generated ?",
    },
    definition: {
      fr: "Pour les entreprises privées qui ne disposent pas de description nous utilisons l'IA générative de <aMistral>Mistral AI</aMistral>. <br></br> À partir du contenu du site web de l'entreprise, nous demandons à Mistral de nous faire un résumé de ses principales activités.",
      en: "For private companies that do not have a description, we use generative AI from <aMistral>Mistral AI</aMistral>. <br></br> Based on the content from the company's website, we ask Mistral to provide us with a summary of its main activities.",
    },
  },
]
