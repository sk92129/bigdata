package com.seankang;

/**
 * Created by seankang on 5/20/2015.
 */
public class Incident {

	private double lat;
	private double lon;
	private String name;

	public Incident(String place, double v, double v1) {
		name = place;
		lat = v;
		lon = v1;
	}


	public double getLat() {
		return lat;
	}

	public void setLat(double lat) {
		this.lat = lat;
	}

	public double getLon() {
		return lon;
	}

	public void setLon(double lon) {
		this.lon = lon;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
}
