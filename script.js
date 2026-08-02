// ========================
// CARROSSEL
// ========================

const slider = document.querySelector(".slider");
const images = document.querySelectorAll(".slider img");

const next = document.querySelector(".next");
const prev = document.querySelector(".prev");


let index = 0;


function showImage(){

    slider.style.transform =
    `translateX(-${index * 100}%)`;

}



if(next && prev && images.length > 0){


    next.onclick = () => {


        index++;


        if(index >= images.length){

            index = 0;

        }


        showImage();


    };



    prev.onclick = () => {


        index--;


        if(index < 0){

            index = images.length - 1;

        }


        showImage();


    };



    setInterval(()=>{


        index++;


        if(index >= images.length){

            index = 0;

        }


        showImage();



    },5000);


}





// ========================
// RELEASES DO GITHUB
// ========================


const repo =
"JonasCaetanoSz/maturador-de-chips";


const versionsList =
document.querySelector("#versions-list");


const showVersions =
document.querySelector(".show-versions");





async function loadVersions(){


    try{


        const response =
        await fetch(
        `https://api.github.com/repos/${repo}/releases`
        );


        const releases =
        await response.json();



        versionsList.innerHTML = "";



        releases.forEach((release,index)=>{


            const item =
            document.createElement("a");



            item.href =
            release.html_url;


            item.target =
            "_blank";



            const date =
            new Date(
                release.published_at
            ).toLocaleDateString("pt-BR", {


                day:"numeric",

                month:"long",

                year:"numeric"


            });



            item.innerHTML = `

                <strong>
                    ${release.tag_name}
                </strong>


                <span>
                    ${date}
                </span>

            `;



            // Primeira release fica visível
            // As outras começam escondidas

            if(index > 0){

                item.classList.add(
                    "old-version"
                );

            }



            versionsList.appendChild(item);



        });



    }
    catch(error){


        versionsList.innerHTML = `

            <p>
                Erro ao carregar versões.
            </p>

        `;


        console.error(error);


    }


}




if(versionsList){

    loadVersions();

}






// ========================
// EXPANDIR VERSÕES
// ========================


if(showVersions && versionsList){



    showVersions.onclick = ()=>{


        versionsList.classList.toggle(
            "show-all"
        );



        if(
        versionsList.classList.contains("show-all")
        ){


            showVersions.textContent =
            "Ocultar versões";


        }
        else{


            showVersions.textContent =
            "Ver todas as versões";


        }



    };


}