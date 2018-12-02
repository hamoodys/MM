"use strict"



function listItems( dataList3 ) {
  let listContainer = document.createElement( "ul" )
  for(let i=0; i<dataList3.length; i++) {
    let itemContainer = document.createElement( "li" )
    let item = document.createTextNode( dataList3[i] )
    if( typeof( dataList3[i] ) == "string" ) {
      itemContainer.appendChild( item )
      listContainer.appendChild( itemContainer )
    }
  }
  return listContainer
}

function listSubCategory( dataList2,subCategory,listCategory ) {
  let subCategories = document.createElement( "ol" )
  listCategory.appendChild( subCategories )
  for(let y=0; y<subCategory.length; y++) {
    let listSubCategory = document.createElement( "li" )
    let showSubCategory = document.createTextNode(subCategory[y])
    listSubCategory.appendChild( showSubCategory )
    subCategories.appendChild( listSubCategory )

    let dataList3 = dataList2[subCategory[y]]
    let listing = listItems( dataList3 ) //Listing
    subCategories.appendChild( listing )
  }
  return subCategories
}

function listCategory( dataList1 ) {
}

function readJSONcallback( response ) {
  let fullResponse = JSON.parse( response )
  let searchLength = fullResponse.length
  let fullListing = document.getElementById( "list" )
  for(let x=0; x<(Object.keys(fullResponse)).length; x++) {
    let category = (Object.keys(fullResponse))
    let showCategory = document.createTextNode(category[x])
    let listCategory = document.createElement( "li" )
    listCategory.appendChild( showCategory )

    let subCategory = (Object.keys(fullResponse[category[x]]))
    let dataList2 = fullResponse[category[x]]
    let listing = listSubCategory( dataList2,subCategory,listCategory ) //Listing
    fullListing.appendChild( listCategory )
  }
}

function findInfoCallback( callback ) {
  let resourceFound = new XMLHttpRequest()
  resourceFound.overrideMimeType( "application/json" )
  resourceFound.open( "GET", "/views/data/resources.json", true )
  resourceFound.onreadystatechange = function() {
    if( resourceFound.status == "200" && resourceFound.readyState == 4 ) {
      callback( resourceFound.responseText )
    }
  }
  resourceFound.send( null )
}

function displayCallbackData() {
  findInfoCallback( readJSONcallback )
}

function init() {
  displayCallbackData()
}

init()


