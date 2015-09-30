package com.seankang;

import org.apache.log4j.Logger;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;


/**
 * Created by seankang on 5/20/2015.
 */

@RestController
@RequestMapping("/incidents")
public class IncidentController {

	private final static Logger LOGGER = Logger.getLogger(IncidentController.class.getName());

	private static HashMap<String, List<Incident>> lookup = new HashMap<String, List<Incident>>();
	static {
		// got the lat lon from address using http://www.latlong.net/convert-address-to-lat-long.html
		List<Incident> list=null;
		list = new ArrayList<Incident>();
		list.clear();
		list.add(new Incident("DaeJangGeum",32.825873, -117.152764 ));
		list.add(new Incident("Nozomi La Jolla",32.873047, -117.217604 ));
		lookup.put("seankang", list);
		list.clear();
		list.add(new Incident("Mesa College",32.803653, -117.164968 ));
		list.add(new Incident("Palomar College",33.149717, -117.183182 ));
		lookup.put("guppykang", list);
	}

	@RequestMapping(value="/", method= RequestMethod.GET)
	public List<Incident> getFavorites() {
		LOGGER.debug("getIncidents" );
		List<Incident> list = getFavoritePlaceByUser(null);
		return list;
	}

	private List<Incident> getFavoritePlaceByUser(String email) {
		// here -- this is just looking up in a fixed list of place by user email address.
		// if this was a real application, it would look up on a database.
		List<Incident> list=null;
		list = lookup.get(email);
		if (list == null){// if user does not exists, at least return the same favorite places.
			list = new ArrayList<Incident>();
			list.add(new Incident("DaeJangGeum",32.825873, -117.152764 ));
			list.add(new Incident("Nozomi La Jolla",32.873047, -117.217604 ));
			lookup.put(email, list);
		}
		return list;
	}
}
