export async function productPurchaseSuccess(productName, img) {

    const popup = document.getElementById("popup");

    popup.innerHTML = `<div class="m-auto flex flex-col gap-8 h-1/2 items-center w-1/2 justify-center">

        <div class="justify-between gap-3 flex flex-col inset-shadow-[0_0_12px_cyan] shadow-[0_0_20px_cyan] hover:shadow-[0_0_30px_cyan] rounded-xl bg-neutral-900 w-full h-auto col-span-1 text-center  p-4 overflow-visible">

            <div class="flex flex-col w-full">
                <p class="text-4xl text-cyan-100 font-bold">You successfully purchased <span id="product-name"></span></p><br>
                <div class="flex flex-row w-full items-center justify-center">
                    <img id="product-img" src="" alt="product image" class="opacity-100 md:max-w-1/2"/>
                </div>
                <p class="text-4xl text-cyan-100 font-bold my-2">Thank you! Your belonging to the GRZ42 Project make the world better!</p>
            </div>
        </div>

    </div>`

    const imgField = document.getElementById("product-img");
    const nameField = document.getElementById("product-name");

    nameField.innerText = productName;
    imgField.setAttribute("src", img);

    popup.classList.remove("hidden!");
    popup.addEventListener("click", () => popup.classList.add("hidden!"))
}


export async function NftMintSuccess(IPFSUrl) {

    const popup = document.getElementById("popup");

    popup.innerHTML = `<div class="m-auto flex flex-col gap-8 h-1/2 items-center 2xl:w-1/2 w-3/4 lg:2/3 justify-center">

        <div class="justify-between gap-3 flex flex-col inset-shadow-[0_0_12px_cyan] shadow-[0_0_20px_cyan] hover:shadow-[0_0_30px_cyan] rounded-xl bg-neutral-900 w-full h-auto col-span-1 text-center  p-4 overflow-visible">

            <div class="flex flex-col w-full">
                <p class="text-4xl text-cyan-100 font-bold">You successfully minted <span id="product-name"></span></p><br>
                <div class="flex flex-col md:flex-row w-full">
                    <img id="product-img" src="" alt="product image" class="opacity-100 md:max-w-1/2"/>
                    <div class="text-white md:w-1/2 justify-between gap-3 flex flex-col inset-shadow-[0_0_12px_cyan] shadow-[0_0_20px_cyan] hover:shadow-[0_0_30px_cyan] rounded-xl bg-neutral-900 h-full col-span-1 text-center  p-4 overflow-visible ">
                        <p id="metadata" class="text-lg text-cyan-100 font-bold break-words text-start"></p>
                    </div>
                </div>
                <p class="text-4xl text-cyan-100 font-bold my-2">Thank you! Your belonging to the GRZ42 Project make the world better!</p>
            </div>
        </div>

    </div>`


    const imgField = document.getElementById("product-img");
    const nameField = document.getElementById("product-name");

    fetch("https://ipfs.io/ipfs/" + IPFSUrl.substring(7))
        .then((result)=> result.json())
        .then((nftMetadata) => {

            document.getElementById("metadata").innerText = JSON.stringify(nftMetadata);

            nameField.innerText = nftMetadata.name;

            const imageUrl = "https://ipfs.io/ipfs/" + nftMetadata.image.substring(7);
            imgField.setAttribute("src", imageUrl);
        })
        .catch((err) => console.log(err));


    popup.classList.remove("hidden!");
    popup.addEventListener("click", () => popup.classList.add("hidden!"))
}