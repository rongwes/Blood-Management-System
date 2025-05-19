document.getElementById("addDonorBtn").addEventListener("click", () => {
  const donor = {
    name: "John Doe",
    bloodType: "O+",
    age: 16 // Change to 20 for valid donor
  };

  let message = "";
  let type = "success";

  if (donor.age < 18) {
    message = `❌ Donor ${donor.name} is underage. Cannot add.`;
    type = "error";
  } else if (
    !["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].includes(donor.bloodType)
  ) {
    message = `⚠️ Donor ${donor.name} has an invalid blood type.`;
    type = "warning";
  } else {
    message = `✅ New donor added: ${donor.name} (${donor.bloodType})`;
    type = "success";
  }

  const list = document.getElementById("notificationList");
  const li = document.createElement("li");
  li.textContent = message;
  li.classList.add("notification", type);
  list.prepend(li); // Add on top
});