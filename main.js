let shorten_btn = document.querySelector(".user_input button")

const keepem_three = (godfather) => {
	let id = 0;
	let copy_btns = document.getElementsByClassName("copy_btn");

	if (godfather.children[4])
	godfather.children[4].remove();
	while (copy_btns[id])
	{
		copy_btns[id].setAttribute("onclick", "copy_func(" + id + ")");
		id++;
	}
}

const copy_func = (index) => {
	const link_after = document.getElementsByClassName("link_after");
	let copy_btns = document.getElementsByClassName("copy_btn");

	navigator.clipboard.writeText(link_after[index].innerText)
	copy_btns[index].style.backgroundColor = "#698fae";
	copy_btns[index].innerText = "Copied!";
	setTimeout(function () {
		copy_btns[index].style.backgroundColor = "hsl(180, 66%, 49%)";
		copy_btns[index].innerText = "Copy";
	}, 1500)
}

const add_to_table = (data, link) => {
	let godfather = document.querySelector(".short");
	let shorten_link = data.result.full_short_link2;
	
	const parent = document.createElement("div");
	const link_before = document.createElement("span");
	const child = document.createElement("div");
	const link_after = document.createElement("span");
	const btn = document.createElement("button");

	parent.setAttribute("class", "shorten_link");
	link_before.setAttribute("class", "link_to_shorten");
	link_after.setAttribute("class", "link_after");
	btn.setAttribute("class", "copy_btn");

	link_before.innerText = link;
	link_after.innerText = shorten_link;
	btn.innerText = "copy";

	parent.appendChild(link_before);
	parent.appendChild(child);
	child.appendChild(link_after);
	child.appendChild(btn);

	godfather.insertBefore(parent, godfather.children[1]);
	keepem_three(godfather);
}

const fetch_link = (link) => {
	fetch("https://api.shrtco.de/v2/shorten?url=" + link, {
		method: 'GET'
	})
		.then((result) => result.json())
		.then((data) => add_to_table(data, link))
}

shorten_btn.addEventListener("click", function () {
	fetch_link(document.querySelector(".user_input input").value);
	document.querySelector(".user_input input").value = "";
})
