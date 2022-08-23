# Débuggez et testez un SaaS RH
Vous êtes développeur front-end chez Billed, une entreprise qui produit des solutions Saas destinées aux équipes de ressources humaines.
Malheureusement pour Billed, Garance, une collègue de la feature team “note de frais” a quitté l’entreprise avant d’avoir terminé l’application. 
Dans deux semaines, l’équipe doit montrer la solution qui fonctionne à l’ensemble de l’entreprise. 
Matthieu, Lead Developer de la feature team a demandé à être aidé pour tenir les délais et vous avez appris hier lors de la réunion d’équipe que c’est vous qui avez été désigné !

<h1>Présentation de la fonctionnalité :</h1>
Pour comprendre son utilité et savoir comment elle marche, lis d’abord <a href="https://s3.eu-west-1.amazonaws.com/course.oc-static.com/projects/DA+JSR_P9/Billed+-+Description+des+fonctionnalite%CC%81s.pdf" target="_blank">la description de la fonctionnalité</a>.
Comme tu peux le constater, il y a deux parcours utilisateurs : un administrateur RH et un employé. 

<h1>État d’avancement du projet :</h1>
L’essentiel a déjà été développé :

✅ Le back-end des deux parcours est prêt en version alpha. 

🚧 Côté front-end :
↳ Parcours administrateur : il a été testé par Garance, il faut désormais le débugger.

↳ Parcours employé : il faut entièrement le tester et le débugger.

Garance avait utilisé Chrome Debugger, il faudra continuer avec cet outil.

<h1>Comment accéder à la fonctionnalité ?</h1>
Tu devras installer <a href="https://github.com/OpenClassrooms-Student-Center/Billed-app-FR-back" target="_blank">le back-end disponible sur ce repo</a> ainsi que <a href="https://github.com/OpenClassrooms-Student-Center/Billed-app-FR-Front" target="_blank">le frontend disponible ici</a>. Suis bien les instructions des deux README pour comprendre comment faire fonctionner tout ça.

<h1>Tes missions :</h1>
Tout ce que j’attends de toi pour fiabiliser et améliorer le parcours employé est décrit dans <a href="https://course.oc-static.com/projects/DA+JSR_P9/Billed+-+Description+pratique+des+besoins+-.pdf" target="_blank">ce document</a>. Il correspond à la description pratique des besoins pour la mise en place de la fonctionnalité. Il faut que tu le lises très attentivement. 
Tu y trouveras notamment le <a href="https://www.notion.so/openclassrooms/a7a612fc166747e78d95aa38106a55ec?v=2a8d3553379c4366b6f66490ab8f0b90" "target="_blank">rapport</a> avec les bugs identifiés (Kanban Notion) ainsi qu’un <a href="https://course.oc-static.com/projects/DA+JSR_P9/Billed+-+E2E+parcours+administrateur.docx" target="_blank">exemple</a> de plan de tests End-to-End. 

# Livrables
- Un fichier au format TXT contenant le lien vers le code à jour sur un repo GitHub public.
- Un screenshot au format PNG du rapport de tests Jest sur l’ensemble des fichiers d’UI (src/views) et des fichiers d’UX (src/containers).
- Un screenshot au format PNG du rapport de couverture Jest.
- Un document au format PDF du plan de tests End-To-End pour le parcours employé.
