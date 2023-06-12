
function showHotelDetailDiv(data) {
  // console.log(data)
  document.getElementById("hotelDetailText").innerHTML = "";
  if (data) {
    document.getElementById("hotelDetailText").innerHTML = `
    
    <div class="card align" style="width: 350px; padding: 10px; text-align: center; font-size: larger;">
        <button class="button" onclick='{imageViewer360(data.images)}; showImageViewer360Div();' style=' display:block;
                height: 30px;
                width: 50px;
                border-radius: 50%;
                border: 1px solid wheat;
                position: relative;
                top:35px;
                float: left;
                left: 220px;
                z-index: 1000;
                '>360</button>
        <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <img class="d-block w-100" style="height: 150px;"
                        src="https://images.unsplash.com/photo-1625244724120-1fd1d34d00f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG90ZWxzfGVufDB8fDB8fHww&w=1000&q=80"
                        alt="First slide">
                </div>
                <div class="carousel-item" style="height: 150px;">
                    <img class="d-block w-100" src="./images/Everest_View.jpg" alt="Second slide">
                </div>
                <div class="carousel-item" style="height: 150px;">
                    <img class="d-block w-100" src="./images/Everest_View.jpg" alt="Third slide">
                </div>
            </div>
            <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
            </a>
        </div>
        <div class="container" style="padding-top: 5px;">
            <div class="row">
                <span class="col-1 fa fa-star fa-2xl" style="padding-right: 1px;"></span>
                <span class="col-1 fa fa-star fa-2xl" style="padding-right: 1px;"></span>
                <span class="col-1 fa fa-star fa-2xl" style="padding-right: 1px;"></span>
                <span class="col-1 fa fa-star fa-2xl" style="padding-right: 1px;"></span>
                <span class="col-1 fa fa-star fa-2xl" style="padding-right: 1px;"></span>
                
            </div>
        </div>
        <h3 style="text-align: left;">
            <h2>${data.name}</h2>
            <h6>Rs.2000/per night</h6>

        </h3>
        <div class="row p-2">
            <span class="col fa fa-wifi " style="padding-right: 20px;"></span>
            <span class="col fa fa-shower " style="padding-right: 20px;"></span>
            <span class="col fa fa-television " style="padding-right: 20px;"></span>
            
        </div>
        <div class="row p-2">
            <button class="col btn btn-success p-1 " data-toggle="modal"
                data-target="#exampleModalCenter">Details</button>
            <button class="col btn btn-success p-1" data-toggle="modal"
                data-target="#exampleModalCenter-1">Book</button>
        </div>

        <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog"
            aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content" style="width: 400px; align-items: center;">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLongTitle">${data.name}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <h5>${data.name}</h5>
                        <h5>$20 Per Night</h5>
                        <p>(cost includes dinner and breakfast)</p>

                        <div class="row">
                            <h5 class="col-7">Additional Services</h5>
                            <div class="row col-5">
                                <span class="col-1 fa fa-star fa-2xl" style="padding-right: 2px;"></span> &nbsp;
                                <span class="col-1 fa fa-star fa-2xl" style="padding-right: 2px;"></span> &nbsp;
                                <span class="col-1 fa fa-star fa-2xl" style="padding-right: 2px;"></span> &nbsp;
                                <span class="col-1 fa fa-star fa-2xl" style="padding-right: 2px;"></span> &nbsp;
                                <span class="col-1 fa fa-star fa-2xl" style="padding-right: 2px;"></span> 
                               
                            </div>
                        </div>
                        
                        <div class="row">
                            <span class="col-2 fa fa-wifi " style="padding-right: px;"></span>
                            <h5 class="col-7">Wifi Avaliable</h5>
                            
                        </div>
                        <div class="row">
                            <span class="col-2 fa fa-wifi " style="padding-right: px;"></span>
                            <h5 class="col-8">Hot and Cold Shower</h5>
                            
                        </div>
                        <div class="row">
                            <span class="col-2 fa fa-wifi " style="padding-right: px;"></span>
                            <h5 class="col-8">Electricity For Charger</h5>
                            
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-success">Book</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="exampleModalCenter-1" tabindex="-1" role="dialog"
            aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content" style="width: 400px; align-items: center;">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLongTitle">${data.name}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="lose">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <h4>Entry Date:
                        <input type="datetime-local" id="Test_DatetimeLocal">
                    </h4>
                    <h4>Leave Date:
                        <input type="datetime-local" id="Test_DatetimeLocal">
                    </h4>
                    
                    <div class="form-check text-left" style="text-align: left;">
                        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                        <label class="form-check-label" for="flexCheckDefault">
                            Pay Cash at the Counter
                        </label>
                    </div>
                    
                    <div class="form-check text-left" >
                        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                        <label class="form-check-label" for="flexCheckDefault">
                            Credit Card
                        </label>
                    </div>
                    
                    <div class="form-check text-left">
                        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                        <label class="form-check-label" for="flexCheckDefault">
                            PayPal
                        </label>
                    </div>
                    
                    <div class="modal-footer">
                        <button type="button" class="btn btn-success" id="myBtn">Confirm</button>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
    <div class="toast" id="myToast">
        <div class="toast-header">
            <strong class="me-auto"><i class="bi-gift-fill"></i>Booking SucessFull </strong>
            <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div class="toast-body">
            Your Booking is Sucessfull.
        </div>
    </div>


    `;
  }
  document.getElementById("hotelDetails").classList.add("show");
}

function imageViewer360(imageURLArray) {
  // console.log(imageURLArray)
  totalNoOfImages = imageURLArray.length;
  // for image management
  let sceneArray = [];
  for (let i in imageURLArray) {
    let scene = {
      "title": "image_" + i.toString(),
      "type": "equirectangular",
      "panorama": imageURLArray[i],
    }
    sceneArray.push(scene);
  }
  panoramaViewer(sceneArray);
  // showImageViewer360Div();
}

function showImageViewer360Div() {
  document.getElementById("imageViewer360").classList.add("show");
}


function legCardGenerator(legInfo, difficulty, i) {

  const legButtonsContainer = document.getElementById(difficulty + '-leg-buttons');
  const prevButton = document.getElementById(difficulty + '-prev-button');
  const nextButton = document.getElementById(difficulty + '-next-button');
  const legDetails = document.getElementById(difficulty + '-leg-details');
  const legDetailsText = document.getElementById(difficulty + '-leg-details-text');

  let totalLegs = legInfo.length;
  let currentGroupIndex = 0;
  let currentActiveLegIndex = 0;
  const groupSize = 3;
  const totalGroups = Math.ceil(totalLegs / groupSize);

  function generateLegButtons() {
    legButtonsContainer.innerHTML = '';
    // console.log(96,startIndex,endIndex)
    for (let i = 0; i < totalLegs; i++) {
      const leg = legInfo[i];
      const details = `
      //cut
      Leg ${i + 1}
      Start: ${leg.start}
      End: ${leg.end}
      Distance: ${leg.distance}
      Duration: ${leg.duration}
      Elevation: ${leg.elevation}
      upto here//


      <div class="card container" style="background-color: transparent; color: #62626B;">
              <div>
                  <div class="row p-lg-1">
                      <div class="col-6">Start</div>
                      <div class="col-5"> ${leg.start}</div>
                  </div>
                  <div class="row p-lg-1">
                      <div class="col-6">End</div>
                      <div class="col">${leg.end}</div>
                  </div>
                  <div class="row p-lg-1">
                      <div class="col-6">Distance</div>
                      <div class="col">${leg.distance}</div>
                  </div>
                  <div class="row p-lg-1">
                      <div class="col-6">Elevation</div>
                      <div class="col-4">${leg.duration}</div>
                  </div>
                  <div class="row p-lg-1">
                      <div class="col-6">Duration</div>
                      <div class="col">${leg.duration}hrs</div>
                  </div>
              </div>
          </div>
      `
      const button = document.createElement('button');
      button.id = difficulty + 'Leg' + i.toString() + 'Button';
      button.classList.add('leg-button');
      button.textContent = "Leg " + (i + 1).toString();
      button.addEventListener('click', () => {
        legDetailsText.innerHTML = details;
        legDetails.classList.add('active');
        currentActiveLegIndex = i;
      });
      legButtonsContainer.appendChild(button);
    }
  }

  function updateLegGroup(startIndex, endIndex, next_prev) {
    for (let i = 0; i < totalLegs; i++) {
      let id = difficulty + 'Leg' + i.toString() + 'Button';
      let legButton = document.getElementById(id);
      if (!legButton) continue;
      if (i >= startIndex && i < endIndex) {
        // Click the first leg button of the group 
        if ((i === startIndex && next_prev === 1) || (i === endIndex-1 && next_prev === -1) || (i === 0 && next_prev === 0)) {
          legButton.click();
        }
        legButton.style.display = '';
      }
      else {
        legButton.style.display = 'none';
      }
    }
  }


  function updateButtonVisibility() {
    prevButton.disabled = currentGroupIndex === 0;
    nextButton.disabled = currentGroupIndex === totalGroups - 1;
  }

  function showGroup(index,next_prev) {
    const startIndex = index * groupSize;
    const endIndex = Math.min(startIndex + groupSize, totalLegs);
    updateLegGroup(startIndex, endIndex, next_prev);
    updateButtonVisibility();
  }

  nextButton.addEventListener('click', () => {
    currentGroupIndex++;
    showGroup(currentGroupIndex,1);
  });

  prevButton.addEventListener('click', () => {
    currentGroupIndex--;
    showGroup(currentGroupIndex,-1);
  });
  generateLegButtons();
  showGroup(currentGroupIndex);
}