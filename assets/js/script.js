$(document).ready(function(){

    let heroes; 
    
    let heroPrimaryAttr = (attr) => {
        if(attr == 'agi'){
            return('Agility');
        }else if(attr == 'str'){
            return('Strength');
        }else{
            return('Intelligence');
        }
    }
    
    function closeModal(){
        $('#heroModal').on('click', '#close', function(){
            $('#heroModal').remove();
        });
    }

    function getHeroes(){
        let heroRow,heroArray = 1; 
        fetch('https://api.opendota.com/api/heroStats')
        .then((response) => response.json())
        .then((fetchHeroes) => { 
            //heroes.push(fetchHeroes);
            heroes = fetchHeroes;
                heroes.forEach((hero) => {
                    let heroName = hero.localized_name;
                    let heroIcon = hero.icon;
                    let heroAttr = heroPrimaryAttr(hero.primary_attr);
                    heroRow += `
                    <tr class="heroRow" id="${hero.id}">
                        <td>${heroArray}</td>
                        <td><img src="https://api.opendota.com${heroIcon}"></td>
                        <td id="heroName"><a class="cursor-pointer" title="Click me for Details" data-toggle="modal">${heroName}</a></td>
                        <td>${heroAttr}</td>
                    </tr>  
                    `;
                    heroArray++;      
                });
            $('#hero-list-tbody').append(heroRow);
         });
    }getHeroes();

    function searchJson(searchVal){
        let heroRow,heroArray = 1,count = 0; 
        fetch('https://api.opendota.com/api/heroStats')
        .then((response) => response.json())
        .then((fetchHeroes) => { 
            //heroes.push(fetchHeroes);
            heroes = fetchHeroes;
            if(searchVal){
                let newSearchValue = new RegExp(searchVal,"gi");
                heroes.forEach((hero) => {
                    let heroName = hero.localized_name;
                    let heroIcon = hero.icon;
                    let heroAttr = heroPrimaryAttr(hero.primary_attr);
                    if(hero.localized_name.match(newSearchValue) || heroPrimaryAttr(hero.primary_attr).match(newSearchValue)){
                        heroRow += `
                        <tr class="heroRow" id="${hero.id}">
                            <td>${heroArray}</td>
                            <td><img src="https://api.opendota.com${heroIcon}"></td>
                            <td id="heroName"><a class="cursor-pointer" title="Click me for Details" data-toggle="modal">${heroName}</a></td>
                            <td>${heroAttr}</td>
                        </tr>  
                        `;
                        heroArray++; 
                        count ++; 
                    }
                });
                if(count == 0){
                    new jBox('Notice', {
                        content: 'Awww! No matches your query. :< Can you please try again.',
                        color: 'red',
                        showCountdown: true,
                        attributes: {
                            y: 'bottom'
                        }
                    });
                }
            }else{
                new jBox('Notice', {
                    content: 'Please Input something! :)',
                    color: 'red',
                    showCountdown: true,
                    attributes: {
                        y: 'bottom'
                    }
                  });
            }
            $('#hero-list-tbody').html(heroRow);
            $('.search-bar').val('');
         });
    }

    function getHeroDetails(id){
        let tempHero, modalOutput = '';
        fetch('https://api.opendota.com/api/heroStats')
        .then((response) => response.json())
        .then((heroData) => {
            tempHero = heroData;
            tempHero.map((hero) => {
                if(hero.id == id){
                    let heroName = hero.localized_name;
                    let heroPrimAttr = heroPrimaryAttr(hero.primary_attr);
                    let heroAttackType = hero.attack_type;
                    let heroRoles = hero.roles;
                    let heroImg = hero.img;
                    let base_health = hero.base_health;
                    let base_health_regen = hero.base_health_regen;
                    let base_mana = hero.base_mana;
                    let base_mana_regen = hero.base_mana_regen;
                    let base_armor = hero.base_armor;
                    let base_mr = hero.base_mr;
                    let base_attack_min = hero.base_attack_min;
                    let base_attack_max = hero.base_attack_max;
                    let base_str = hero.base_str;
                    let base_agi = hero.base_agi;
                    let base_int = hero.base_int;
                    let str_gain = hero.str_gain;
                    let agi_gain = hero.agi_gain;
                    let int_gain = hero.int_gain;
                    let attack_range = hero.attack_range;
                    let projectile_speed = hero.projectile_speed;
                    let attack_rate = hero.attack_rate;
                    let move_speed = hero.move_speed;
                    let turn_rate = hero.turn_rate;

                    modalOutput +=`
                        <div id="heroModal" class="modal">
                            <div class="modal-content">
                                <span class="close" id="close">&times;</span>
                                <h1 class="hero-modal-name">${heroName}</h1>
                                <div class="hero-modal-header">
                                    <div class="hero-modal-image">
                                        <img src="https://api.opendota.com${heroImg}" alt="${heroName}"/>
                                    </div>
                                    <div class="hero-modal-basic-stats">
                                        <div class="inline">
                                            <h1><span>${heroAttackType}</span>${heroRoles}</h1>
                                            <h1><span>Primary Attribute: </span>${heroPrimAttr}</h1>
                                        </div>
                                        <div class="inline">
                                            <h1>
                                                <span class="strength">str &bull; ${base_str}</span>
                                                <span class="agility">agi &bull; ${base_agi}</span>
                                                <span class="intelligence">int &bull; ${base_int}</span>
                                            </h1>
                                        </div>
                                    </div>
                                </div>
                                <div class="hero-modal-stats">
                                    <div class="inline">
                                        <table class="hero-modal-table-stats">
                                            <tr><td>Health:</td><td>${base_health}</td></tr>
                                            <tr><td>Health Regen:</td><td>${base_health_regen}</td></tr>
                                            <tr><td>Mana:</td><td>${base_mana}</td></tr>
                                            <tr><td>Mana Regen:</td><td>${base_mana_regen}</td></tr>
                                            <tr><td>Armor:</td><td>${base_armor}</td></tr>
                                            <tr><td>Magic Resist:</td><td>${base_mr}</td></tr>
                                            <tr><td>Minimum Attack:</td><td>${base_attack_min}</td></tr>
                                            <tr><td>Maximum Attack:</td><td>${base_attack_max}</td></tr>
                                        </table>
                                        <table class="hero-modal-table-stats">
                                            <tr><td>Strength Gain:</td><td>${str_gain}</td></tr>
                                            <tr><td>Agility Gain:</td><td>${agi_gain}</td></tr>
                                            <tr><td>Intelligence Gain:</td><td>${int_gain}</td></tr>
                                            <tr><td>Attack Range:</td><td>${attack_range}</td></tr>
                                            <tr><td>Projectile Speed:</td><td>${projectile_speed}</td></tr>
                                            <tr><td>Attack Rate:</td><td>${attack_rate}</td></tr>
                                            <tr><td>Move Speed:</td><td>${move_speed}</td></tr>
                                            <tr><td>Turn Rate:</td><td>${turn_rate}</td></tr>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        `;
                }
            });
            $('.container').append(modalOutput);
            closeModal();
        });
        
    }

    $('.search-bar').on('keypress', (e) => {
        if(e.keyCode == '13'){ 
            searchJson($('.search-bar').val());
        }
    });

    $('.search-btn').on('click', function(){
        searchJson($('.search-bar').val());
    });

    $('#hero-list').on('click', '#heroName', function(){
        getHeroDetails($(this).parent().attr('id')); 
    });

    $('#heroModal').on('click', '#close', function(){
        //$('#heroModal').remove();
        alert("closed");
    });

    $('#hero-reset').on('click', function(){
        $('.heroRow').remove();
        getHeroes();
    });

    
});